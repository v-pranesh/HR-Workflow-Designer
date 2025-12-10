import { useState } from 'react';
import { Play, AlertCircle, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useWorkflow } from '@/context/WorkflowContext';
import { useSimulation } from '@/hooks/useSimulation';
import { ExecutionStep } from '@/types/workflow';
import { cn } from '@/lib/utils';

const StatusIcon = ({ status }: { status: ExecutionStep['status'] }) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4 text-muted-foreground" />;
    case 'running':
      return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-node-start" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-destructive" />;
  }
};

const getNodeTypeColor = (type: string) => {
  switch (type) {
    case 'start':
      return 'bg-node-start';
    case 'task':
      return 'bg-node-task';
    case 'approval':
      return 'bg-node-approval';
    case 'automated':
      return 'bg-node-automated';
    case 'end':
      return 'bg-node-end';
    default:
      return 'bg-primary';
  }
};

export function SimulationPanel() {
  const [open, setOpen] = useState(false);
  const { nodes, edges, validateWorkflow, validationErrors } = useWorkflow();
  const { isRunning, result, error, runSimulation, clearResult } = useSimulation();

  const handleSimulate = async () => {
    const isValid = validateWorkflow();
    if (!isValid) return;

    await runSimulation({ nodes, edges });
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      clearResult();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Test Workflow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Workflow Simulation</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Validation Errors</span>
              </div>
              <ul className="space-y-1">
                {validationErrors.map((err, i) => (
                  <li key={i} className="text-sm text-destructive/80">
                    • {err.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Run Button */}
          <Button
            onClick={handleSimulate}
            disabled={isRunning || nodes.length === 0}
            className="w-full gap-2"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Running Simulation...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Simulation
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {result.success ? (
                    <Badge variant="default" className="bg-node-start hover:bg-node-start/90">
                      Success
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Failed</Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  Duration: {result.totalDuration}
                </span>
              </div>

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {result.steps.map((step, index) => (
                    <div
                      key={step.nodeId + index}
                      className="execution-step"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                          getNodeTypeColor(step.nodeType)
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium truncate">
                            {step.nodeTitle}
                          </span>
                          <StatusIcon status={step.status} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {step.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
