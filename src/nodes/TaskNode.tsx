import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { ClipboardList, Calendar } from 'lucide-react';
import { TaskNodeData } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface TaskNodeProps extends NodeProps {
  data: TaskNodeData;
}

const TaskNode = memo(({ data, selected }: TaskNodeProps) => {
  return (
    <div
      className={cn(
        'workflow-node min-w-[180px] border-node-task bg-node-task-light',
        selected && 'ring-2 ring-node-task ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle !bg-node-task"
      />
      <div className="flex items-center gap-2 px-4 py-3 bg-node-task rounded-t-md">
        <ClipboardList className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Task</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-foreground truncate">{data.title}</p>
        {data.assignee && (
          <p className="text-xs text-muted-foreground">
            Assigned to: {data.assignee}
          </p>
        )}
        {data.dueDate && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {data.dueDate}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle !bg-node-task"
      />
    </div>
  );
});

TaskNode.displayName = 'TaskNode';

export default TaskNode;
