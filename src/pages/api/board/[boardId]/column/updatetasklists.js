import ColumnService from "@/services/column";
import TaskService from "@/services/task";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "PUT") {
      const { boardId } = req.query;
      const { data, userId } = req.body;
      const {
        taskId,
        startColumnId,
        endColumnId,
        newStartTaskIdList,
        newEndTaskIdList,
        isRemoveTask,
      } = data;
      const columnResult = await ColumnService.updateTaskLists(
        boardId,
        startColumnId,
        endColumnId,
        newStartTaskIdList,
        newEndTaskIdList,
        userId
      );
      const taskResult = await TaskService.update(
        boardId,
        taskId,
        { columnId: isRemoveTask == true ? null : endColumnId },
        userId
      );
      res.status(200).json({
        message: "Column Task List(s) updated",
        columns: {
          startColumn: columnResult.startColumn.toObject(),
          endColumn: columnResult.endColumn.toObject(),
        },
        task: taskResult.toObject(),
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
