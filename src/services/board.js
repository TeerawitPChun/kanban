import lowdb from "../db/lowdb";

import Board from "../models/board";
import { NotFoundError, CantDeleteError } from "../models/errors";

const BoardService = {
  get: async (id) => {
    try {
      await lowdb.read();
      if (!lowdb.data[id]) {
        throw new NotFoundError("Board", id);
      }
      const board = lowdb.data[id];
      return board;
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      const boards = [];
      await lowdb.read();
      for (let key in lowdb.data) {
        if (lowdb.data.hasOwnProperty(key)) {
          const board = new Board(lowdb.data[key]);
          boards.push(board);
        }
      }
      return boards;
    } catch (error) {
      throw error;
    }
  },
  create: async (data, userId) => {
    try {
      const board = new Board({ ...data }, userId);
      await lowdb.read();
      lowdb.data[board.id] = board.toObject();
      await lowdb.write();
      return board;
    } catch (error) {
      throw error;
    }
  },
  update: async (id, data, userId) => {
    try {
      await lowdb.read();
      if (!lowdb.data[id]) {
        throw new NotFoundError("Board", id);
      }
      const board = new Board(lowdb.data[id]);
      board.update(data, userId);
      lowdb.data[id] = board.toObject();
      await lowdb.write();
      return board;
    } catch (error) {
      throw error;
    }
  },
  removeColumnFromList: async (id, columnId, userId) => {
    try {
      await lowdb.read();
      if (!lowdb.data[id]) {
        throw new NotFoundError("Board", id);
      }
      const board = new Board(lowdb.data[id]);
      const newColumnIdList = board.columnIdList.filter((column) => column != columnId);
      board.updateColumnList(newColumnIdList, userId);
      lowdb.data[id] = board.toObject();
      await lowdb.write();
      return board;
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    try {
      await lowdb.read();
      if (!lowdb.data[id] || !(id in lowdb.data)) {
        throw new NotFoundError("Board", id);
      }
      const board = new Board(lowdb.data[id]);
      delete lowdb.data[id];
      await lowdb.write();
      return board;
    } catch (error) {
      throw error;
    }
  },
};

export default BoardService;
