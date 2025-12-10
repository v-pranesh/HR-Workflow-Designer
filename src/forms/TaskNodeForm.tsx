import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { TaskNodeData, CustomField } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';

interface TaskNodeFormProps {
  nodeId: string;
  data: TaskNodeData;
}

export function TaskNodeForm({ nodeId, data }: TaskNodeFormProps) {
  const { updateNodeData } = useWorkflow();

  const handleChange = (field: keyof TaskNodeData, value: string) => {
    updateNodeData(nodeId, { [field]: value });
  };

  const handleAddCustomField = () => {
    const newFields: CustomField[] = [
      ...data.customFields,
      { name: '', type: 'text', value: '' }
    ];
    updateNodeData(nodeId, { customFields: newFields });
  };

  const handleCustomFieldChange = (
    index: number,
    field: keyof CustomField,
    value: string
  ) => {
    const newFields = data.customFields.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateNodeData(nodeId, { customFields: newFields });
  };

  const handleRemoveCustomField = (index: number) => {
    const newFields = data.customFields.filter((_, i) => i !== index);
    updateNodeData(nodeId, { customFields: newFields });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Task Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter task title"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the task..."
              className="mt-1.5 min-h-[80px]"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Assignment</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="assignee">Assignee</Label>
            <Input
              id="assignee"
              value={data.assignee}
              onChange={(e) => handleChange('assignee', e.target.value)}
              placeholder="Enter assignee name or email"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={data.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Custom Fields</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddCustomField}
            className="h-8"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Field
          </Button>
        </div>

        {data.customFields.length === 0 ? (
          <p className="text-sm text-muted-foreground">No custom fields. Click Add Field to create one.</p>
        ) : (
          <div className="space-y-4">
            {data.customFields.map((field, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Field {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveCustomField(index)}
                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Field name"
                    value={field.name}
                    onChange={(e) => handleCustomFieldChange(index, 'name', e.target.value)}
                    className="text-sm"
                  />
                  <Select
                    value={field.type}
                    onValueChange={(value) => handleCustomFieldChange(index, 'type', value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Default value"
                  value={field.value}
                  onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
