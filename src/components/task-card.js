import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const TaskCard = (props) => {
  const { column, task } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          ID: {task.id}
        </Typography>
        <Typography variant="h5" component="div">
          Title: {task.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Status: {task.isOpen ? "Open" : "Closed"}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          CreatedAt: {task.createdAt}
        </Typography>

        <Typography variant="body2">
          {task.description || "PLACHOLDER CONTENT"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
};
export default TaskCard;
