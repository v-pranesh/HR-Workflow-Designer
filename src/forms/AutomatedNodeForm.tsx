import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { AutomatedNodeData } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';
import { useAutomations } from '@/hooks/useAutomations';

interface AutomatedNodeFormProps {
  nodeId: string;
  data: AutomatedNodeData;
}

export function AutomatedNodeForm({ nodeId, data }: AutomatedNodeFormProps) {
  const { updateNodeData } = useWorkflow();
  const { automations, isLoading, getActionById } = useAutomations();

  const selectedAction = getActionById(data.actionId);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(nodeId, { title: e.target.value });
  };

  const handleActionChange = (actionId: string) => {
    // Reset parameters when action changes
    updateNodeData(nodeId, { actionId, parameters: {} });
  };

  const handleParameterChange = (paramName: string, value: string) => {
    updateNodeData(nodeId, {
      parameters: { ...data.parameters, [paramName]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Automation Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={handleTitleChange}
              placeholder="Enter step title"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="action">Action</Label>
            {isLoading ? (
              <Skeleton className="h-10 mt-1.5" />
            ) : (
              <Select value={data.actionId} onValueChange={handleActionChange}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {automations.map((action) => (
                    <SelectItem key={action.id} value={action.id}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>

      {selectedAction && selectedAction.params.length > 0 && (
        <div className="form-section">
          <h3 className="text-sm font-semibold text-foreground mb-4">Parameters</h3>
          <div className="space-y-4">
            {selectedAction.params.map((param) => (
              <div key={param}>
                <Label htmlFor={param} className="capitalize">
                  {param.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <Input
                  id={param}
                  value={data.parameters[param] || ''}
                  onChange={(e) => handleParameterChange(param, e.target.value)}
                  placeholder={`Enter ${param}`}
                  className="mt-1.5"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
