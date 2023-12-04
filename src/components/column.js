import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "./task-card";
import TaskList from "./task-list";

// import { useTheme } from "@mui/material/styles";

const Column = (props) => {
  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
  }, []);
  const { column, tasks, index } = props;
  return (
    <Draggable
      draggableId={column.id}
      index={index}
      key={column.id}
      type="COLUMN"
    >
      {(provided) => (
        <Paper
          // maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "200px",
            width: "auto",
            height: "100%",
          }}
          // width="auto"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Box sx={{ width: "100%", padding: 2 }} {...provided.dragHandleProps}>
            <h1>{column.title}</h1>
          </Box>
          <Button></Button>
          <Divider></Divider>
          {winReady && (
            <Droppable droppableId={column.id} type="TASK">
              {(provided, snapshot) => (
                <TaskList innerRef={provided.innerRef} provided={provided}>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                      type="TASK"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            key={task.id}
                            column={column}
                            task={task}
                            index={index}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TaskList>
              )}
            </Droppable>
          )}
        </Paper>
      )}
    </Draggable>
  );
};

export default Column;
