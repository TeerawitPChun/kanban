import TaskService from "@/services/task";
import ColumnService from "@/services/column";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { boardId, taskId } = req.query;
      const task = await TaskService.get(boardId, taskId);
      res.status(200).json({ task: task.toObject() });
      return;
    }
    if (req.method === "PUT") {
      const { boardId, taskId } = req.query;
      const { data, userId } = req.body;
      const task = await TaskService.update(boardId, taskId, data, userId);
      res.status(200).json({ message: "Task Updated", task: task.toObject() });
      return;
    }
    if (req.method === "DELETE") {
      const { boardId, taskId } = req.query;
      const { userId } = req.body;
      const task = await TaskService.delete(boardId, taskId);
      await ColumnService.removeTaskFromList(task.columnId, taskId, userId);
      res.status(200).json({ message: "Task Deleted", task: task.toObject() });
      return;
    }
    res.status(405).end();
    return;
  } catch (error) {
    // console.log(error);
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error });
    }
    res.status(500).json({ error: error });
  }
};

export default handler;
