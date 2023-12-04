import BoardService from "@/services/board";
import { NotFoundError } from "@/models/errors";

const handler = async (req, res) => {
  try {
    if (req.method === "GET") {
      const allBoards = await BoardService.getAll();
      res.status(200).json({ boards: allBoards });
      return;
    }
    if (req.method === "POST") {
      const { data, userId } = req.body;
      const board = await BoardService.create(data, userId);
      res.status(201).json({ message: "Added Board", board: board });
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
