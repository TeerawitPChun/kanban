import TaskService from "@/services/task";
import ColumnService from "@/services/column";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { boardId } = req.query;
      const tasks = await TaskService.getAll(boardId);
      res.status(200).json({ tasks: tasks.map((task) => task.toObject()) });
      return;
    }
    if (req.method === "POST") {
      const { boardId } = req.query;
      const { data, userId } = req.body;
      const task = await TaskService.create(boardId, data, userId);
      await ColumnService.updateTaskLists
      res.status(200).json({ message: "Task Created", task: task.toObject() });
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
