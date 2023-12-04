import ColumnService from "@/services/column";
import BoardService from "@/services/board";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { boardId, columnId } = req.query;
      const column = await ColumnService.get(boardId, columnId);
      res.status(200).json({ column: column.toObject() });
      return;
    }
    if (req.method === "PUT") {
      const { boardId, columnId } = req.query;
      const { data, userId } = req.body;
      const column = await ColumnService.update(
        boardId,
        columnId,
        data,
        userId
      );
      res
        .status(200)
        .json({ message: "Column Updated", column: column.toObject() });
      return;
    }
    if (req.method === "DELETE") {
      const { boardId, columnId } = req.query;
      const { userId } = req.body;
      const column = await ColumnService.delete(columnId);
      await BoardService.removeColumnFromList(boardId, columnId, userId);
      res
        .status(200)
        .json({ message: "Column Deleted", column: column.toObject() });
      return;
    }
    res.status(405).end();
    return;
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error });
      return;
    }
    if (error instanceof CantDeleteError) {
      res.status(400).json({ error: error });
      return;
    }
    res.status(500).json({ error: error });
  }
};

export default handler;
