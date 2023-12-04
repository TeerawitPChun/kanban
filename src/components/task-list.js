import { Container } from "@mui/material";

const TaskList = (props) => {
  const { provided, innerRef, children } = props;
  return <Container className="TaskList" ref={innerRef} {...provided.droppableProps}>{children}</Container>;
};

export default TaskList;
