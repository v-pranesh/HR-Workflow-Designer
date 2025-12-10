import { WorkflowProvider } from '@/context/WorkflowContext';
import { Sidebar } from '@/components/Sidebar';
import { WorkflowCanvas } from '@/components/WorkflowCanvas';
import { NodeConfigPanel } from '@/components/NodeConfigPanel';

const Index = () => {
  return (
    <WorkflowProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Canvas */}
        <WorkflowCanvas />

        {/* Right Panel - Node Configuration */}
        <NodeConfigPanel />
      </div>
    </WorkflowProvider>
  );
};

export default Index;
