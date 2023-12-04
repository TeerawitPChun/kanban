import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box, Paper } from "@mui/material";

import Column from "./column";

const Dashboard = (props) => {
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);
  const [state, setState] = useState(props.data);
  const columnIdList = state.columnIdList;
  const columnList = columnIdList.map((id) => {
    const column = state.columns[id];
    const tasks = column.taskIdList.map((id) => state.tasks[id]);
    return { column, tasks };
  });
  const onDragEnd = (result) => {
    const { draggableId, type, reason, source, destination } = result;
    console.log("onDragEnd: ", result);
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    if (type === "COLUMN") {
      const newColumnIdList = Array.from(state.columnIdList);
      newColumnIdList.splice(source.index, 1);
      newColumnIdList.splice(destination.index, 0, draggableId);
      const newState = { ...state, columnIdList: newColumnIdList };
      setState(newState);
      return;
    }
    if (type === "TASK") {
      if (source.droppableId == destination.droppableId) {
        const column = state.columns[source.droppableId];
        const newTaskIdList = Array.from(column.taskIdList);
        newTaskIdList.splice(source.index, 1);
        newTaskIdList.splice(destination.index, 0, draggableId);
        const newColumn = { ...column, taskIdList: newTaskIdList };
        const newState = {
          ...state,
          columns: { ...state.columns, [newColumn.id]: newColumn },
        };
        setState(newState);
        return;
      } else {
        const startColumn = state.columns[source.droppableId];
        const endColumn = state.columns[destination.droppableId];
        const newStartTaskIdList = Array.from(startColumn.taskIdList);
        const newEndTaskIdList = Array.from(endColumn.taskIdList);
        newStartTaskIdList.splice(source.index, 1);
        newEndTaskIdList.splice(destination.index, 0, draggableId);
        const newStartColumn = {
          ...startColumn,
          taskIdList: newStartTaskIdList,
        };
        const newEndColumn = { ...endColumn, taskIdList: newEndTaskIdList };
        const newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStartColumn.id]: newStartColumn,
            [newEndColumn.id]: newEndColumn,
          },
        };
        setState(newState);
        return;
      }
    }
  };
  return (
    <Box width="100%" height="100%">
      <h1 style={{ textAlign: "center" }}>{state.title}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        {winReady && (
          <Droppable
            droppableId="allColumns"
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <Paper
                sx={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnList.map((columnItem, index) => (
                  <Column
                    key={columnItem.column.id}
                    column={columnItem.column}
                    tasks={columnItem.tasks}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </Paper>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </Box>
  );
};

export default Dashboard;
