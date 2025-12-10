import { Node, Edge } from '@xyflow/react';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface MetadataItem {
  key: string;
  value: string;
}

export interface CustomField {
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  value: string;
}

export interface StartNodeData {
  type: 'start';
  title: string;
  metadata: MetadataItem[];
  [key: string]: unknown;
}

export interface TaskNodeData {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: CustomField[];
  [key: string]: unknown;
}

export interface ApprovalNodeData {
  type: 'approval';
  title: string;
  approverRole: 'manager' | 'hrbp' | 'director';
  autoApproveThreshold: number;
  [key: string]: unknown;
}

export interface AutomatedNodeData {
  type: 'automated';
  title: string;
  actionId: string;
  parameters: Record<string, string>;
  [key: string]: unknown;
}

export interface EndNodeData {
  type: 'end';
  title: string;
  endMessage: string;
  showSummary: boolean;
  [key: string]: unknown;
}

export type WorkflowNodeData = 
  | StartNodeData 
  | TaskNodeData 
  | ApprovalNodeData 
  | AutomatedNodeData 
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;
export type WorkflowEdge = Edge;

export interface Workflow {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

export interface ExecutionStep {
  nodeId: string;
  nodeTitle: string;
  nodeType: NodeType;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  message: string;
}

export interface SimulationResult {
  success: boolean;
  steps: ExecutionStep[];
  totalDuration: string;
}

export interface ValidationError {
  nodeId?: string;
  message: string;
}
