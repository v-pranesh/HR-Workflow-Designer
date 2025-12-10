import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { EndNodeData } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface EndNodeProps extends NodeProps {
  data: EndNodeData;
}

const EndNode = memo(({ data, selected }: EndNodeProps) => {
  return (
    <div
      className={cn(
        'workflow-node min-w-[160px] border-node-end bg-node-end-light',
        selected && 'ring-2 ring-node-end ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle !bg-node-end"
      />
      <div className="flex items-center gap-2 px-4 py-3 bg-node-end rounded-t-md">
        <Flag className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">End</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-foreground truncate">
          {data.endMessage || 'Workflow completed'}
        </p>
        {data.showSummary && (
          <p className="text-xs text-muted-foreground">
            Summary enabled
          </p>
        )}
      </div>
    </div>
  );
});

EndNode.displayName = 'EndNode';

export default EndNode;
