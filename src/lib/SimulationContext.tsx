import React, { createContext, useContext, useState, useEffect } from 'react';
import { sensors as initialSensors, farms as initialFarms, activities as initialActivities } from './mockData';

type Sensor = typeof initialSensors[0];
type Farm = typeof initialFarms[0];
type Activity = typeof initialActivities[0];

interface SimulationContextType {
  sensors: Sensor[];
  farms: Farm[];
  activities: Activity[];
  addFarm: (farm: Farm) => void;
  logActivity: (activity: Activity) => void;
  updateSensor: (id: string, updates: Partial<Sensor>) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: React.ReactNode }) => {
  const [sensors, setSensors] = useState<Sensor[]>(initialSensors);
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // Real-time WebSockets connection
  useEffect(() => {
    import('socket.io-client').then(({ io }) => {
      const socket = io('http://localhost:3000');

      socket.on('connect', () => {
        logActivity({
          time: 'Just now',
          type: 'sensor',
          text: 'Connected to Trinexa Core live telemetry stream.',
        });
      });

      socket.on('device_twin_update', (twinState: any) => {
        // Map backend twin state to our frontend sensors state
        if (twinState.sensors) {
          setSensors((prevSensors) =>
            prevSensors.map((sensor) => {
              if (twinState.sensors[sensor.id] !== undefined) {
                return {
                  ...sensor,
                  value: parseFloat(Number(twinState.sensors[sensor.id]).toFixed(1)),
                };
              }
              return sensor;
            })
          );
        }
      });

      return () => {
        socket.disconnect();
      };
    }).catch(err => console.error("Socket.io not installed", err));
  }, []);

  const addFarm = (farm: Farm) => {
    setFarms((prev) => [farm, ...prev]);
    logActivity({
      time: 'Just now',
      type: 'farm',
      text: `New farm ${farm.name} registered and syncing.`,
    });
  };

  const logActivity = (activity: Activity) => {
    setActivities((prev) => [activity, ...prev].slice(0, 50)); // Keep last 50
  };

  const updateSensor = (id: string, updates: Partial<Sensor>) => {
    setSensors((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <SimulationContext.Provider value={{ sensors, farms, activities, addFarm, logActivity, updateSensor }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
