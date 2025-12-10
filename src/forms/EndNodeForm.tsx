import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { EndNodeData } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';

interface EndNodeFormProps {
  nodeId: string;
  data: EndNodeData;
}

export function EndNodeForm({ nodeId, data }: EndNodeFormProps) {
  const { updateNodeData } = useWorkflow();

  const handleChange = (field: keyof EndNodeData, value: unknown) => {
    updateNodeData(nodeId, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">End Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="End node title"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="endMessage">End Message</Label>
            <Textarea
              id="endMessage"
              value={data.endMessage}
              onChange={(e) => handleChange('endMessage', e.target.value)}
              placeholder="Message to display when workflow ends..."
              className="mt-1.5 min-h-[80px]"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Options</h3>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="showSummary">Show Summary</Label>
            <p className="text-xs text-muted-foreground">
              Display a summary of all steps when workflow completes
            </p>
          </div>
          <Switch
            id="showSummary"
            checked={data.showSummary}
            onCheckedChange={(checked) => handleChange('showSummary', checked)}
          />
        </div>
      </div>
    </div>
  );
}
