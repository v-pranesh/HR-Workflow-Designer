import { Play, ClipboardList, UserCheck, Zap, Flag } from 'lucide-react';
import { NodeType } from '@/types/workflow';
import { useWorkflow } from '@/context/WorkflowContext';

interface DragNodeItemProps {
  type: NodeType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const DragNodeItem = ({ type, label, icon, color }: DragNodeItemProps) => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="drag-node-item"
      draggable
      onDragStart={(e) => onDragStart(e, type)}
    >
      <div
        className="flex items-center justify-center w-8 h-8 rounded-md"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <span className="text-sm font-medium text-sidebar-foreground">{label}</span>
    </div>
  );
};

export function NodePalette() {
  const nodeItems: DragNodeItemProps[] = [
    {
      type: 'start',
      label: 'Start',
      icon: <Play className="w-4 h-4 text-white" />,
      color: 'hsl(142 71% 45%)',
    },
    {
      type: 'task',
      label: 'Task',
      icon: <ClipboardList className="w-4 h-4 text-white" />,
      color: 'hsl(221 83% 53%)',
    },
    {
      type: 'approval',
      label: 'Approval',
      icon: <UserCheck className="w-4 h-4 text-white" />,
      color: 'hsl(38 92% 50%)',
    },
    {
      type: 'automated',
      label: 'Automated',
      icon: <Zap className="w-4 h-4 text-white" />,
      color: 'hsl(262 83% 58%)',
    },
    {
      type: 'end',
      label: 'End',
      icon: <Flag className="w-4 h-4 text-white" />,
      color: 'hsl(0 84% 60%)',
    },
  ];

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider px-1">
        Drag to Canvas
      </h3>
      <div className="space-y-2">
        {nodeItems.map((item) => (
          <DragNodeItem key={item.type} {...item} />
        ))}
      </div>
    </div>
  );
}
