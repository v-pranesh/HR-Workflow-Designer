import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ApprovalNodeData } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';

interface ApprovalNodeFormProps {
  nodeId: string;
  data: ApprovalNodeData;
}

export function ApprovalNodeForm({ nodeId, data }: ApprovalNodeFormProps) {
  const { updateNodeData } = useWorkflow();

  const handleChange = (field: keyof ApprovalNodeData, value: unknown) => {
    updateNodeData(nodeId, { [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Approval Settings</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter approval title"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="approverRole">Approver Role</Label>
            <Select
              value={data.approverRole}
              onValueChange={(value) => handleChange('approverRole', value)}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select approver role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="hrbp">HR Business Partner</SelectItem>
                <SelectItem value="director">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Auto-Approval</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="threshold">Auto-Approve Threshold</Label>
              <span className="text-sm font-medium text-primary">
                ${data.autoApproveThreshold.toLocaleString()}
              </span>
            </div>
            <Slider
              id="threshold"
              value={[data.autoApproveThreshold]}
              onValueChange={([value]) => handleChange('autoApproveThreshold', value)}
              min={0}
              max={10000}
              step={100}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Requests under this amount will be auto-approved. Set to $0 to disable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
