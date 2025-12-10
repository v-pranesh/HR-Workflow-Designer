import { X, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWorkflow } from '@/context/WorkflowContext';
import {
  StartNodeForm,
  TaskNodeForm,
  ApprovalNodeForm,
  AutomatedNodeForm,
  EndNodeForm,
} from '@/forms';
import {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedNodeData,
  EndNodeData,
} from '@/types/workflow';

export function NodeConfigPanel() {
  const { getSelectedNode, selectNode, deleteNode } = useWorkflow();
  const selectedNode = getSelectedNode();

  if (!selectedNode) {
    return (
      <div className="w-80 bg-panel border-l border-panel-border flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-sm text-muted-foreground">
            Select a node to view and edit its properties
          </p>
        </div>
      </div>
    );
  }

  const renderForm = () => {
    switch (selectedNode.data.type) {
      case 'start':
        return (
          <StartNodeForm
            nodeId={selectedNode.id}
            data={selectedNode.data as StartNodeData}
          />
        );
      case 'task':
        return (
          <TaskNodeForm
            nodeId={selectedNode.id}
            data={selectedNode.data as TaskNodeData}
          />
        );
      case 'approval':
        return (
          <ApprovalNodeForm
            nodeId={selectedNode.id}
            data={selectedNode.data as ApprovalNodeData}
          />
        );
      case 'automated':
        return (
          <AutomatedNodeForm
            nodeId={selectedNode.id}
            data={selectedNode.data as AutomatedNodeData}
          />
        );
      case 'end':
        return (
          <EndNodeForm
            nodeId={selectedNode.id}
            data={selectedNode.data as EndNodeData}
          />
        );
      default:
        return null;
    }
  };

  const getNodeTypeLabel = () => {
    switch (selectedNode.data.type) {
      case 'start':
        return 'Start Node';
      case 'task':
        return 'Task Node';
      case 'approval':
        return 'Approval Node';
      case 'automated':
        return 'Automated Step';
      case 'end':
        return 'End Node';
      default:
        return 'Node';
    }
  };

  const getNodeColor = () => {
    switch (selectedNode.data.type) {
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

  return (
    <div className="w-80 bg-panel border-l border-panel-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-panel-border">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getNodeColor()}`} />
          <span className="text-sm font-semibold text-foreground">
            {getNodeTypeLabel()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => deleteNode(selectedNode.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => selectNode(null)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <ScrollArea className="flex-1">
        <div className="p-4">{renderForm()}</div>
      </ScrollArea>
    </div>
  );
}
