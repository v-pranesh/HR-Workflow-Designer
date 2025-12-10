import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { StartNodeData } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface StartNodeProps extends NodeProps {
  data: StartNodeData;
}

const StartNode = memo(({ data, selected }: StartNodeProps) => {
  return (
    <div
      className={cn(
        'workflow-node min-w-[160px] border-node-start bg-node-start-light',
        selected && 'ring-2 ring-node-start ring-offset-2'
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-node-start rounded-t-md">
        <Play className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Start</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-foreground truncate">{data.title}</p>
        {data.metadata.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            {data.metadata.length} metadata item{data.metadata.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle !bg-node-start"
      />
    </div>
  );
});

StartNode.displayName = 'StartNode';

export default StartNode;
