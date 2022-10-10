import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', event.target.innerHTML);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onDragStarttext=(ev)=>{
    ev.dataTransfer.setData("text", ev.target.id);
  }

  return (
    <aside>
      <div className="description">Drag and Drop a trigger to start the flow</div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'input')} draggable>
      When customer creates an account
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
      Customer places and order
      </div>
      <div className="dndnode " onDragStart={(event) => onDragStart(event, 'output')} draggable>
      When you tag an order
      </div>
     
    </aside>
  );
};
