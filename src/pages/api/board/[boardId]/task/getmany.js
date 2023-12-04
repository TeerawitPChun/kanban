import TaskService from "@/services/task";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { boardId } = req.query;
      const { idList } = req.body.data;
      let { nullForNotFound } = req.body;
      if (nullForNotFound != true) {
        nullForNotFound = false;
      }
      const tasks = await TaskService.getMany(boardId, idList, nullForNotFound);
      res.status(200).json({
        tasks: tasks.map((task) => {
          return task ? task.toObject() : task;
        }),
      });
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
