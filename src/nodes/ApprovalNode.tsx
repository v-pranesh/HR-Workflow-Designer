import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { UserCheck } from 'lucide-react';
import { ApprovalNodeData } from '@/types/workflow';
import { cn } from '@/lib/utils';

interface ApprovalNodeProps extends NodeProps {
  data: ApprovalNodeData;
}

const roleLabels: Record<string, string> = {
  manager: 'Manager',
  hrbp: 'HR Business Partner',
  director: 'Director',
};

const ApprovalNode = memo(({ data, selected }: ApprovalNodeProps) => {
  return (
    <div
      className={cn(
        'workflow-node min-w-[180px] border-node-approval bg-node-approval-light',
        selected && 'ring-2 ring-node-approval ring-offset-2'
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="node-handle !bg-node-approval"
      />
      <div className="flex items-center gap-2 px-4 py-3 bg-node-approval rounded-t-md">
        <UserCheck className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Approval</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm font-medium text-foreground truncate">{data.title}</p>
        <p className="text-xs text-muted-foreground">
          Approver: {roleLabels[data.approverRole] || data.approverRole}
        </p>
        {data.autoApproveThreshold > 0 && (
          <p className="text-xs text-muted-foreground">
            Auto-approve: ≤ ${data.autoApproveThreshold}
          </p>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="node-handle !bg-node-approval"
      />
    </div>
  );
});

ApprovalNode.displayName = 'ApprovalNode';

export default ApprovalNode;
