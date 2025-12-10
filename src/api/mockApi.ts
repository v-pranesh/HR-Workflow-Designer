import { AutomationAction, SimulationResult, Workflow, ExecutionStep, NodeType } from '@/types/workflow';

// Mock automation actions
const automationActions: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'update_record', label: 'Update HR Record', params: ['recordId', 'field', 'value'] },
  { id: 'notify_slack', label: 'Notify Slack Channel', params: ['channel', 'message'] },
  { id: 'create_ticket', label: 'Create Support Ticket', params: ['category', 'priority', 'description'] },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAutomations = async (): Promise<AutomationAction[]> => {
  await delay(300);
  return automationActions;
};

export const simulateWorkflow = async (workflow: Workflow): Promise<SimulationResult> => {
  await delay(500);
  
  const steps: ExecutionStep[] = [];
  
  // Find start node
  const startNode = workflow.nodes.find(n => n.data.type === 'start');
  if (!startNode) {
    return {
      success: false,
      steps: [{
        nodeId: 'validation',
        nodeTitle: 'Validation Error',
        nodeType: 'start',
        status: 'failed',
        timestamp: new Date().toISOString(),
        message: 'No start node found in workflow'
      }],
      totalDuration: '0ms'
    };
  }

  const startTime = Date.now();
  
  // Traverse workflow and generate execution steps
  const visited = new Set<string>();
  const queue = [startNode.id];
  
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (visited.has(currentId)) continue;
    visited.add(currentId);
    
    const node = workflow.nodes.find(n => n.id === currentId);
    if (!node) continue;
    
    await delay(100); // Simulate processing time
    
    const step: ExecutionStep = {
      nodeId: node.id,
      nodeTitle: node.data.title,
      nodeType: node.data.type as NodeType,
      status: 'completed',
      timestamp: new Date().toISOString(),
      message: generateStepMessage(node.data)
    };
    
    steps.push(step);
    
    // Find connected nodes
    const outgoingEdges = workflow.edges.filter(e => e.source === currentId);
    outgoingEdges.forEach(edge => {
      if (!visited.has(edge.target)) {
        queue.push(edge.target);
      }
    });
  }
  
  const endTime = Date.now();
  
  return {
    success: true,
    steps,
    totalDuration: `${endTime - startTime}ms`
  };
};

function generateStepMessage(data: Record<string, unknown>): string {
  const type = data.type as string;
  const title = data.title as string;
  
  switch (type) {
    case 'start':
      return `Workflow started: ${title}`;
    case 'task':
      return `Task "${title}" assigned to ${data.assignee || 'unassigned'}`;
    case 'approval':
      return `Awaiting approval from ${data.approverRole || 'manager'}`;
    case 'automated':
      return `Executing automated action: ${data.actionId || 'none selected'}`;
    case 'end':
      return (data.endMessage as string) || 'Workflow completed successfully';
    default:
      return 'Step executed';
  }
}
