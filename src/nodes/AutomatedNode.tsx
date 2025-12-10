import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';
import { AutomatedNodeData } from '@/types/workflow';
import { cn } from '@/lib/utils';
import { useAutomations } from '@/hooks/useAutomations';

interface AutomatedNodeProps extends NodeProps {
  data: AutomatedNodeData;
}

const AutomatedNode = memo(({ data, selected }: AutomatedNodeProps) => {
  const { getActionById } = useAutomations();
  const action = getActionById(data.actionId);

  return (
    <div
      className={cn(
        'workflow-node min-w-[180px] border-node-automated bg-node-automated-light',
        selected && 'ring-2 ring-node-automated ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle !bg-node-automated"
      />
      <div className="flex items-center gap-2 px-4 py-3 bg-node-automated rounded-t-md">
        <Zap className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Automated</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-foreground truncate">{data.title}</p>
        <p className="text-xs text-muted-foreground">
          Action: {action?.label || 'Not selected'}
        </p>
        {Object.keys(data.parameters).length > 0 && (
          <p className="text-xs text-muted-foreground">
            {Object.keys(data.parameters).length} parameter{Object.keys(data.parameters).length !== 1 ? 's' : ''} set
          </p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle !bg-node-automated"
      />
    </div>
  );
});

AutomatedNode.displayName = 'AutomatedNode';

export default AutomatedNode;
