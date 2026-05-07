import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const navigate = useNavigate();

  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleCommand = useCallback((command: string) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('dashboard') || cmd.includes('home')) {
      speak("Navigating to dashboard");
      navigate('/dashboard');
    } else if (cmd.includes('sensor')) {
      speak("Opening sensors page");
      navigate('/sensors');
    } else if (cmd.includes('crop') || cmd.includes('ai')) {
      speak("Opening crop diagnostic engine");
      navigate('/crop-ai');
    } else if (cmd.includes('weather')) {
      speak("Opening weather forecast");
      navigate('/weather');
    } else if (cmd.includes('irrigation')) {
      speak("Opening irrigation control");
      navigate('/irrigation');
    } else if (cmd.includes('expense') || cmd.includes('finance')) {
      speak("Opening financial dashboard");
      navigate('/expenses');
    } else if (cmd.includes('market')) {
      speak("Opening market prices");
      navigate('/market');
    } else if (cmd.includes('hello') || cmd.includes('hi')) {
      speak("Hello! I am your Trinexa assistant. How can I help you today?");
    } else {
      speak("Command not recognized. Please try saying Go to dashboard or Open sensors.");
    }
  }, [navigate, speak]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      handleCommand(result);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return { isListening, transcript, startListening, speak };
};
