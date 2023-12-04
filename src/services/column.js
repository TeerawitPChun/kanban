import lowdb from "../db/lowdb";

import Column from "../models/column";
import { NotFoundError, CantDeleteError } from "../models/errors";

const ColumnService = {
  get: async (boardId, id) => {
    try {
      await lowdb.read();
      if (!lowdb.data[boardId].columns) {
        lowdb.data[boardId].columns = {};
        await lowdb.write();
      }
      if (!(id in lowdb.data[boardId].columns)) {
        throw new NotFoundError("Column", id);
      }
      const column = new Column(lowdb.data[boardId].columns[id]);
      return column;
    } catch (error) {
      throw error;
    }
  },
  getMany: async (boardId, idList, nullForNotFound = false) => {
    try {
      const columns = [];
      await lowdb.read();
      if (!lowdb.data[boardId].columns) {
        lowdb.data[boardId].columns = {};
        await lowdb.write();
        return [];
      }
      for (let id in idList) {
        const columnObject = lowdb.data[boardId].columns[id];
        if (!columnObject && nullForNotFound) {
          columns.push(null);
        } else {
          const column = new Column(columnObject);
          columns.push(column);
        }
      }
      return columns;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (boardId) => {
    try {
      const columns = [];
      await lowdb.read();
      if (!lowdb.data[boardId].columns) {
        lowdb.data[boardId].columns = {};
        await lowdb.write();
        return [];
      }
      const columnsObject = lowdb.data[boardId].columns;
      for (let key in columnsObject) {
        if (columnsObject.hasOwnProperty(key)) {
          const column = new Column(columnsObject[key]);
          columns.push(column);
        }
      }
      return columns;
    } catch (error) {
      throw error;
    }
  },
  create: async (boardId, data, userId) => {
    try {
      const defaultValues = {
        title: "",
        description: "",
        status: false,
        column: null,
        order: null,
        isArchived: false,
      };
      const column = new Column({ ...defaultValues, ...data }, userId);
      await lowdb.read();
      if (!lowdb.data[boardId].columns) {
        lowdb.data[boardId].columns = {};
      }
      if (!lowdb.data[boardId].columnIdList) {
        lowdb.data[boardId].columnIdList = [];
      }
      lowdb.data[boardId].columns[column.id] = column.toObject();
      lowdb.data[boardId].columnIdList.push(column.id);
      await lowdb.write();
      return column;
    } catch (error) {
      throw error;
    }
  },
  update: async (boardId, id, data, userId) => {
    try {
      await lowdb.read();
      if (
        !lowdb.data[boardId].columns ||
        !(id in lowdb.data[boardId].columns)
      ) {
        throw new NotFoundError("Column", id);
      }
      const column = new Column(lowdb.data[boardId].columns[id]);
      column.update(data, userId);
      lowdb.data[boardId].columns[id] = column.toObject();
      await lowdb.write();
      return column;
    } catch (error) {
      throw error;
    }
  },
  updateTaskLists: async (
    boardId,
    startColumnId,
    endColumnId,
    newStartTaskIdList,
    newEndTaskIdList,
    userId
  ) => {
    try {
      await lowdb.read();
      if (!lowdb.data[boardId].columns) {
        lowdb.data[boardId].columns = [];
        await lowdb.write();
        throw new NotFoundError("Column", startColumnId);
      }
      const startColumnObject = lowdb.data[boardId].columns[startColumnId];
      const endColumnObject = lowdb.data[boardId].columns[endColumnId];
      if (!startColumnObject) {
        throw new NotFoundError("Column", startColumnId);
      }
      if (!endColumnObject) {
        throw new NotFoundError("Column", endColumnId);
      }
      const startColumn = new Column(startColumnObject);
      startColumn.updateTaskList(newStartTaskIdList, userId);
      lowdb.data[boardId].columns[startColumnId] = startColumn.toObject();
      const result = { startColumn: startColumn, endColumn: startColumn };
      if (startColumnId != endColumnId) {
        const endColumn = new Column(endColumnObject);
        endColumn.updateTaskList(
          newEndTaskIdList,
          userId,
          startColumn.modifiedAt
        );
        lowdb.data[boardId].columns[endColumnId] = endColumn.toObject();
        result.endColumn = endColumn;
      }
      await lowdb.write();
      return result;
    } catch (error) {
      throw error;
    }
  },
  removeTaskFromList: async (boardId, id, taskId, userId) => {
    try {
      await lowdb.read();
      if (
        !lowdb.data[boardId].columns ||
        !(id in lowdb.data[boardId].columns)
      ) {
        throw new NotFoundError("Column", id);
      }
      const column = new Column(lowdb.data[boardId].columns[id]);
      const newTaskIdList = column.taskIdList.filter((task) => task != taskId);
      column.updateTaskList(newTaskIdList, userId);
      lowdb.data[boardId].columns[id] = column.toObject();
      await lowdb.write();
      return column;
    } catch (error) {
      throw error;
    }
  },
  delete: async (boardId, id) => {
    try {
      await lowdb.read();
      if (
        !lowdb.data[boardId].columns ||
        !(id in lowdb.data[boardId].columns)
      ) {
        throw new NotFoundError("Column", id);
      }
      if (!lowdb.data[boardId].columnIdList) {
        lowdb.data[boardId].columnIdList = [];
      }
      const column = new Column(lowdb.data[boardId].columns[id]);
      if (column.taskIdList && column.taskIdList.length > 0) {
        throw new CantDeleteError("Column", id, "Task List is not empty.");
      }
      delete lowdb.data[boardId].columns[id];
      lowdb.data[boardId].columnIdList = lowdb.data[
        boardId
      ].columnIdList.filter((column) => column != id);

      await lowdb.write();
      return column;
    } catch (error) {
      throw error;
    }
  },
};

export default ColumnService;
