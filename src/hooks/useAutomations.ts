import { useState, useEffect } from 'react';
import { AutomationAction } from '@/types/workflow';
import { fetchAutomations } from '@/api/mockApi';

export function useAutomations() {
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAutomations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAutomations();
        setAutomations(data);
        setError(null);
      } catch (err) {
        setError('Failed to load automation actions');
        console.error('Error loading automations:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAutomations();
  }, []);

  const getActionById = (id: string): AutomationAction | undefined => {
    return automations.find((a) => a.id === id);
  };

  return { automations, isLoading, error, getActionById };
}
