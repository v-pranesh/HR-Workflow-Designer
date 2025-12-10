import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  WorkflowNode, 
  WorkflowEdge, 
  WorkflowNodeData, 
  ValidationError,
  NodeType 
} from '@/types/workflow';
import { v4 as uuidv4 } from 'uuid';
import {
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';

interface WorkflowContextType {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  validationErrors: ValidationError[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: NodeType, position: { x: number; y: number }) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  selectNode: (nodeId: string | null) => void;
  validateWorkflow: () => boolean;
  getSelectedNode: () => WorkflowNode | undefined;
  clearWorkflow: () => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

const createDefaultNodeData = (type: NodeType): WorkflowNodeData => {
  switch (type) {
    case 'start':
      return { type: 'start', title: 'Start', metadata: [] };
    case 'task':
      return { 
        type: 'task', 
        title: 'New Task', 
        description: '', 
        assignee: '', 
        dueDate: '',
        customFields: []
      };
    case 'approval':
      return { 
        type: 'approval', 
        title: 'Approval Required', 
        approverRole: 'manager',
        autoApproveThreshold: 0
      };
    case 'automated':
      return { 
        type: 'automated', 
        title: 'Automated Step', 
        actionId: '',
        parameters: {}
      };
    case 'end':
      return { 
        type: 'end', 
        title: 'End',
        endMessage: 'Workflow completed',
        showSummary: true
      };
  }
};

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [edges, setEdges] = useState<WorkflowEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds) as WorkflowNode[]);
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge({ ...connection, id: uuidv4() }, eds));
  }, []);

  const addNode = useCallback((type: NodeType, position: { x: number; y: number }) => {
    const newNode: WorkflowNode = {
      id: uuidv4(),
      type,
      position,
      data: createDefaultNodeData(type),
    };
    setNodes((nds) => [...nds, newNode]);
  }, []);

  const updateNodeData = useCallback((nodeId: string, data: Partial<WorkflowNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } as WorkflowNodeData }
          : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
    }
  }, [selectedNodeId]);

  const deleteEdge = useCallback((edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
  }, []);

  const selectNode = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const validateWorkflow = useCallback((): boolean => {
    const errors: ValidationError[] = [];
    
    // Check for start node
    const startNodes = nodes.filter((n) => n.data.type === 'start');
    if (startNodes.length === 0) {
      errors.push({ message: 'Workflow must have a Start node' });
    } else if (startNodes.length > 1) {
      errors.push({ message: 'Workflow can only have one Start node' });
    }

    // Check for end node
    const endNodes = nodes.filter((n) => n.data.type === 'end');
    if (endNodes.length === 0) {
      errors.push({ message: 'Workflow must have an End node' });
    }

    // Check if start node has incoming edges (invalid)
    if (startNodes.length === 1) {
      const startNode = startNodes[0];
      const incomingToStart = edges.filter((e) => e.target === startNode.id);
      if (incomingToStart.length > 0) {
        errors.push({ 
          nodeId: startNode.id, 
          message: 'Start node cannot have incoming connections' 
        });
      }
    }

    // Check if all nodes are connected
    const connectedNodes = new Set<string>();
    edges.forEach((e) => {
      connectedNodes.add(e.source);
      connectedNodes.add(e.target);
    });
    
    nodes.forEach((node) => {
      if (nodes.length > 1 && !connectedNodes.has(node.id)) {
        errors.push({ 
          nodeId: node.id, 
          message: `Node "${node.data.title}" is not connected` 
        });
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  }, [nodes, edges]);

  const getSelectedNode = useCallback(() => {
    return nodes.find((node) => node.id === selectedNodeId);
  }, [nodes, selectedNodeId]);

  const clearWorkflow = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setValidationErrors([]);
  }, []);

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        selectedNodeId,
        validationErrors,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        updateNodeData,
        deleteNode,
        deleteEdge,
        selectNode,
        validateWorkflow,
        getSelectedNode,
        clearWorkflow,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  const context = useContext(WorkflowContext);
  if (context === undefined) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
}
