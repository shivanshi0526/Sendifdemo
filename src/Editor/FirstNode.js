import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';



function FirstNode({ data }) {
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }, []);
      const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          console.log("hdfghdgfdhgfhd")
        },
     
      );

  return (
    <div className="first-node"  onDragOver={onDragOver}  onDrop={onDrop}>
      <Handle type="target" position={Position.Top} />
      <div>
        <div><h3 style ={{textAlign:"center"}}>Trigger</h3></div>
        <div><h6 style ={{textAlign:"center"}}>drag and drop here to start the flow</h6></div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default FirstNode;
