import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { StartNodeData, MetadataItem } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';

interface StartNodeFormProps {
  nodeId: string;
  data: StartNodeData;
}

export function StartNodeForm({ nodeId, data }: StartNodeFormProps) {
  const { updateNodeData } = useWorkflow();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateNodeData(nodeId, { title: e.target.value });
  };

  const handleAddMetadata = () => {
    const newMetadata: MetadataItem[] = [...data.metadata, { key: '', value: '' }];
    updateNodeData(nodeId, { metadata: newMetadata });
  };

  const handleMetadataChange = (index: number, field: 'key' | 'value', value: string) => {
    const newMetadata = data.metadata.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    updateNodeData(nodeId, { metadata: newMetadata });
  };

  const handleRemoveMetadata = (index: number) => {
    const newMetadata = data.metadata.filter((_, i) => i !== index);
    updateNodeData(nodeId, { metadata: newMetadata });
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h3 className="text-sm font-semibold text-foreground mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={data.title}
              onChange={handleTitleChange}
              placeholder="Enter start title"
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Metadata</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddMetadata}
            className="h-8"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add
          </Button>
        </div>
        
        {data.metadata.length === 0 ? (
          <p className="text-sm text-muted-foreground">No metadata items. Click Add to create one.</p>
        ) : (
          <div className="space-y-3">
            {data.metadata.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Key"
                    value={item.key}
                    onChange={(e) => handleMetadataChange(index, 'key', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) => handleMetadataChange(index, 'value', e.target.value)}
                    className="text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveMetadata(index)}
                  className="h-9 w-9 text-muted-foreground hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
