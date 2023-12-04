import BoardService from "@/services/board";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const boardId = req.query.boardId;
      const board = await BoardService.get(boardId);
      res.status(200).json({ board: board });
      return;
    }
    if (req.method === "PUT") {
      const boardId = req.query.boardId;
      const { data, userId } = req.body;
      const board = await BoardService.update(boardId, data, userId);
      res.status(200).json({ message: "Board Updated", board: board.toObject() });
      return;
    }
    if (req.method === "DELETE") {
      const boardId = req.query.boardId;
      const board = await BoardService.delete(boardId);
      res.status(200).json({ message: "Board Deleted", board: board.toObject() });
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
