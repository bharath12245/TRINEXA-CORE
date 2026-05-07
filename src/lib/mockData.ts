export const sensors = [
  { id: 'soil', name: 'Soil Moisture', value: 42, unit: '%', status: 'optimal', icon: 'Droplets', trend: 2.4, color: 'primary' },
  { id: 'temp', name: 'Temperature', value: 28.6, unit: '°C', status: 'optimal', icon: 'Thermometer', trend: -0.8, color: 'accent' },
  { id: 'humid', name: 'Humidity', value: 67, unit: '%', status: 'optimal', icon: 'CloudDrizzle', trend: 3.2, color: 'secondary' },
  { id: 'ph', name: 'Soil pH', value: 6.8, unit: 'pH', status: 'optimal', icon: 'FlaskConical', trend: 0.1, color: 'primary' },
  { id: 'npk', name: 'NPK Index', value: 84, unit: 'idx', status: 'good', icon: 'Sprout', trend: 1.5, color: 'primary' },
  { id: 'water', name: 'Water Tank', value: 78, unit: '%', status: 'good', icon: 'Container', trend: -4.1, color: 'secondary' },
  { id: 'rain', name: 'Rain Probability', value: 32, unit: '%', status: 'low', icon: 'CloudRain', trend: 12.0, color: 'secondary' },
  { id: 'light', name: 'Light Intensity', value: 86400, unit: 'lux', status: 'high', icon: 'Sun', trend: 4.4, color: 'accent' },
  { id: 'wind', name: 'Wind Speed', value: 12.4, unit: 'km/h', status: 'optimal', icon: 'Wind', trend: -1.2, color: 'secondary' },
  { id: 'air', name: 'Air Quality', value: 47, unit: 'AQI', status: 'good', icon: 'Activity', trend: -2.8, color: 'primary' },
];

export const generateSparkData = (n = 20, base = 50, range = 20) =>
  Array.from({ length: n }, (_, i) => ({ x: i, y: base + Math.sin(i / 2) * range / 2 + (Math.random() - 0.5) * range }));

export const farms = [
  { id: 1, name: 'Green Valley Estate', location: 'Pune, MH', area: '14.2 acres', crop: 'Rice + Wheat', health: 92, status: 'active' },
  { id: 2, name: 'North Field Farm', location: 'Nashik, MH', area: '8.5 acres', crop: 'Grapes', health: 87, status: 'active' },
  { id: 3, name: 'Sunrise Plantation', location: 'Bengaluru, KA', area: '22.0 acres', crop: 'Coffee', health: 78, status: 'syncing' },
];

export const activities = [
  { time: '2 min ago', type: 'irrigation', text: 'Auto-irrigation started in Zone B (18 min duration)' },
  { time: '14 min ago', type: 'ai', text: 'AI detected optimal conditions for fertilizer application' },
  { time: '1 hr ago', type: 'weather', text: 'Heavy rainfall predicted tomorrow — irrigation paused' },
  { time: '3 hr ago', type: 'power', text: 'Switched to solar power, battery at 96%' },
  { time: '5 hr ago', type: 'sensor', text: 'NPK sensor recalibrated successfully' },
  { time: '8 hr ago', type: 'market', text: 'Wheat market price up 4.2% — best sell window opened' },
];

export const marketPrices = [
  { crop: 'Rice (Basmati)', mandi: 'Pune APMC', price: 4280, change: 2.4, demand: 'High' },
  { crop: 'Wheat', mandi: 'Nashik Mandi', price: 2640, change: 4.2, demand: 'High' },
  { crop: 'Tomato', mandi: 'Mumbai APMC', price: 1820, change: -3.1, demand: 'Medium' },
  { crop: 'Onion', mandi: 'Lasalgaon', price: 2150, change: 7.8, demand: 'Very High' },
  { crop: 'Sugarcane', mandi: 'Kolhapur', price: 380, change: 0.8, demand: 'Stable' },
];

export const expenses = [
  { category: 'Seeds', amount: 24000, color: 'hsl(142 76% 50%)' },
  { category: 'Fertilizer', amount: 18500, color: 'hsl(180 70% 50%)' },
  { category: 'Labor', amount: 42000, color: 'hsl(88 80% 55%)' },
  { category: 'Water', amount: 8200, color: 'hsl(200 70% 60%)' },
  { category: 'Electricity', amount: 6400, color: 'hsl(40 90% 60%)' },
  { category: 'Machinery', amount: 15000, color: 'hsl(280 60% 60%)' },
];
