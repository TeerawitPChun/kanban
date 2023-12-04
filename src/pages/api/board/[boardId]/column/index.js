import ColumnService from "@/services/column";
import { NotFoundError, CantDeleteError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { boardId } = req.query;
      const columns = await ColumnService.getAll(boardId);
      res.status(200).json({ columns: columns.map((column) => column.toObject()) });
      return;
    }
    if (req.method === "POST") {
      const { boardId } = req.query;
      const { data, userId } = req.body;
      const column = await ColumnService.create(boardId, data, userId);
      res.status(200).json({ message: "Column Created", column: column.toObject() });
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
