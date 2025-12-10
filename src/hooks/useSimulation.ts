import { useState, useCallback } from 'react';
import { SimulationResult, Workflow } from '@/types/workflow';
import { simulateWorkflow } from '@/api/mockApi';

export function useSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = useCallback(async (workflow: Workflow) => {
    try {
      setIsRunning(true);
      setError(null);
      setResult(null);
      
      const simulationResult = await simulateWorkflow(workflow);
      setResult(simulationResult);
      
      return simulationResult;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Simulation failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { isRunning, result, error, runSimulation, clearResult };
}
