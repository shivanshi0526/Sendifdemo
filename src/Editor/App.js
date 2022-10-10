import React, { useState, useMemo, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MarkerType,useReactFlow
} from 'react-flow-renderer';
import { Handle, Position } from 'react-flow-renderer';

import { getBezierPath, getEdgeCenter, getMarkerEnd } from 'react-flow-renderer';
import './index.css';
import Sidebar from './Sidebar';
import TextUpdaterNode from './TextUpdaterNode.js';
const flowKey = 'example-flow';


const initialNodes = [
    {
        id: '1',
        type: "textUpdater",
        data: { label: 'input node' },
        position: { x: 200, y: 10 },
    },
];





let id = 0;
const getId = () => `dndnode_${id++}`;

let drag_data;


const DnDFlow = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [rfInstance, setRfInstance] = useState(null);
  //  const { setViewport } = useReactFlow();
    const getNodeId = () => `randomnode_${+new Date()}`;

    const onConnect = useCallback(
       
        (params) => setEdges((eds) => 
         addEdge({ ...params, type: 'buttonedge' }, eds)),
        []
    );
    const foreignObjectSize = 40;

    const onEdgeClick = (event, id) => {
        event.stopPropagation();
       console.log(event)
       const newNode = [
        { id: getId(), type: 'textUpdater', position: { x: 100, y: 50 }, data: { value: 123 } },
    ];
    setNodes((nds) => nds.concat(newNode));
    
       
    };
    const markerEdge = {
        source: '1',
        target: '2',
        markerStart: 'myCustomSvgMarker',
        markerEnd: { type: 'arrow', color: '#f00' },
      };



    function FirstNode({ data }) {
        const onDragOver = useCallback((event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }, []);
        const onDrop = useCallback(
            (event) => {
                drag_data = event.dataTransfer.getData("application/reactflow");
                
                event.preventDefault();
                console.log("hdfghdgfdhgfhd",data, event.target)
                const positionx = initialNodes[0].position
                const positiony=(parseInt(initialNodes[0].position.y)+300)
                console.log(initialNodes[0].position.x,initialNodes[0].position.y)
                initialNodes.pop()
                console.log(initialNodes, nodes, positionx)
                const newNode = [
                    {
                        id: 'edges-1', type: 'customNode', position: positionx, data: { value: 123 }
                    } ,{
                        id: 'edges-2', type: 'actionNode', position: {x:positionx.x, y:positiony}, data: { value: 123 }
                    },
                ];
                setNodes((nds) => [])
                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) => 
         addEdge({ 
            id: 'edges-e1-2',
            source: 'edges-1',
            target: 'edges-2',
            className: 'normal-edge',
            type:'buttonedge',
             markerEnd: {
                type: MarkerType.Arrow,
              }, }, []));
            
                
            },
            console.log(initialNodes, nodes)
        );

        return (
            <div className="first-node" onDragOver={onDragOver} onDrop={onDrop}>
                <Handle type="target" position={Position.Top} />
                <div style={{    position: "relative", top:" 20px"}}>
                    <div><h3 style={{ textAlign: "center" }}>Trigger</h3></div>
                    <div><h6 style={{ textAlign: "center" }}>drag and drop here to start the flow</h6></div>
                </div>
                <Handle type="source" position={Position.Bottom} id="b" />
            </div>
        );
    }
    function ActionNode({ data }) {
        const onDragOver = useCallback((event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }, []);
        const onDrop = useCallback(
            (event) => {
                drag_data = event.dataTransfer.getData("application/reactflow");
                
                event.preventDefault();
                console.log("hdfghdgfdhgfhd",data, event.target)
                const positionx = initialNodes[0].position
                initialNodes.pop()
                console.log(initialNodes, nodes, positionx)
                const newNode = [
                    {
                        id: getId(), type: 'input', position: positionx, data: { value: 123 }
                    }, {
                        id: getId(), type: 'customNode', position: positionx, data: { value: 123 }
                    }
                ];
                setNodes((nds) => [])
                setNodes((nds) => nds.concat(newNode));
            },
            console.log(initialNodes, nodes)
        );

        return (
            <div className="first-node" onDragOver={onDragOver} onDrop={onDrop}>
                <Handle type="target" position={Position.Top} />
                <div style={{    position: "relative", top:" 20px"}}>
                    <div><h3 style={{ textAlign: "center" }}>Action</h3></div>
                    <div><h6 style={{ textAlign: "center" }}>drag and drop an Action here</h6></div>
                </div>
                <Handle type="source" position={Position.Bottom} id="b" />
            </div>
        );
    }
    const nodeTypes = useMemo(() => ({ textUpdater: FirstNode, customNode: CustomNode, actionNode:ActionNode }), []);
    function CustomNode({ data }) {
        const onDragOver = useCallback((event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
        }, []);
        const onDrop = useCallback(
            (ev) => {

                ev.preventDefault();
                var data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
            },
            console.log(initialNodes, nodes)
        );

        return (
            <div className="custom-node">
                <Handle type="target" position={Position.Top} />
                <div>
                    <div style={{ textAlign: "center", height: "40px" }}>Start flow when</div>
                    <hr style={{ borderColor: " #0fa2d8" }} />
                    <div style={{ height: "100px" }} onDragOver={onDragOver} onDrop={onDrop}><div className='text'>{drag_data}</div></div>
                </div>
                <Handle type="source" position={Position.Bottom} id="b" />
            </div>
        );
    }

    function CustomEdge({
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        markerEnd,
    }) {
        const edgePath = getBezierPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
        });
        const [edgeCenterX, edgeCenterY] = getEdgeCenter({
            sourceX,
            sourceY,
            targetX,
            targetY,
        });

        return (
            <>
                <path
                    id={id}
                    style={style}
                    className="react-flow__edge-path"
                    d={edgePath}
                    markerEnd={markerEnd}
                />
                <foreignObject
                    width={foreignObjectSize}
                    height={foreignObjectSize}
                    x={edgeCenterX - foreignObjectSize / 2}
                    y={edgeCenterY - foreignObjectSize / 2}
                    className="edgebutton-foreignobject"
                    requiredExtensions="http://www.w3.org/1999/xhtml"
                >
                    <body>
                        <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
                            ×
                        </button>
                    </body>
                </foreignObject>
            </>
        )
    }





    const edgeTypes = {
        buttonedge: CustomEdge,
    };


    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = rfInstance .project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [rfInstance ]
    );
    const onSave = useCallback(() => {
        if (rfInstance) {
          const flow = rfInstance.toObject();
          localStorage.setItem(flowKey, JSON.stringify(flow));
        }
      }, [rfInstance]);
    
      const onRestore = useCallback(() => {
        const restoreFlow = async () => {
          const flow = JSON.parse(localStorage.getItem(flowKey));
    
          if (flow) {
            const { x = 0, y = 0, zoom = 1 } = flow.viewport;
            setNodes(flow.nodes || []);
            setEdges(flow.edges || []);
         //   setViewport({ x, y, zoom });
          }
        };
    
        restoreFlow();
      }, [setNodes]);
    
      const onAdd = useCallback(() => {
        const newNode = {
          id: getNodeId(),
          data: { label: 'Added node' },
          type: 'default',
          position: {
            x: Math.random() * window.innerWidth - 100,
            y: Math.random() * window.innerHeight,
          },
        };
        setNodes((nds) => nds.concat(newNode));
      }, [setNodes]);

    return (
        <div className="dndflow">
            <Sidebar />
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        // onDrop={onDrop}
                        edgeTypes={edgeTypes}
                        nodeTypes={nodeTypes}
                        onInit={setRfInstance}
                    //  onDragOver={onDragOver}
                    // fitView
                    >
                        <Controls />
                        <Background color="black" gap={16} />
                        <div className="save__controls">
        <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button>
        <button onClick={onAdd}>add node</button>
      </div>
                    </ReactFlow>
                </div>

            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;