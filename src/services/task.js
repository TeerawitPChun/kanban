import lowdb from "../db/lowdb";

import Task from "../models/task";
import { NotFoundError } from "../models/errors";

const TaskService = {
  get: async (boardId, id) => {
    try {
      await lowdb.read();
      if (!lowdb.data[boardId].tasks) {
        lowdb.data[boardId].tasks = {};
        await lowdb.write();
        return [];
      }
      if (!(id in lowdb.data[boardId].tasks)) {
        throw new NotFoundError("Task", id);
      }
      const task = new Task(lowdb.data[boardId].tasks[id]);
      return task;
    } catch (error) {
      throw error;
    }
  },
  getMany: async (boardId, idList, nullForNotFound = false) => {
    try {
      const tasks = [];
      await lowdb.read();
      if (!lowdb.data[boardId].tasks) {
        lowdb.data[boardId].tasks = {};
        await lowdb.write();
        return [];
      }
      idList.forEach((id) => {
        const taskObject = lowdb.data[boardId].tasks[id];
        if (!taskObject) {
          if (nullForNotFound) {
            tasks.push(null);
          }
        } else {
          const task = new Task(taskObject);
          tasks.push(task);
        }
      });
      return tasks;
    } catch (error) {
      throw error;
    }
  },
  getAll: async (boardId) => {
    try {
      const tasks = [];
      await lowdb.read();
      if (!lowdb.data[boardId].tasks) {
        lowdb.data[boardId].tasks = {};
        await lowdb.write();
        return [];
      }
      const tasksObject = lowdb.data[boardId].tasks;
      for (let key in tasksObject) {
        if (tasksObject.hasOwnProperty(key)) {
          const task = new Task(tasksObject[key]);
          tasks.push(task);
        }
      }
      return tasks;
    } catch (error) {
      throw error;
    }
  },
  getAllArchived: async (boardId) => {
    try {
      const tasks = [];
      await lowdb.read();
      if (!lowdb.data[boardId].tasks) {
        lowdb.data[boardId].tasks = {};
        await lowdb.write();
        return [];
      }
      const tasksObject = lowdb.data[boardId].tasks;
      for (let key in tasksObject) {
        if (tasksObject.hasOwnProperty(key)) {
          const task = new Task(tasksObject[key]);
          if (task.isArchived) {
            tasks.push(task);
          }
        }
      }
      return tasks;
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
        columnId: null,
        order: null,
        isOpen: true,
        isArchived: false,
      };
      const { columnId } = data;
      const task = new Task({ ...defaultValues, ...data }, userId);
      await lowdb.read();
      if (!lowdb.data[boardId].tasks) {
        lowdb.data[boardId].tasks = {};
      }
      lowdb.data[boardId].tasks[task.id] = task.toObject();
      if (
        columnId &&
        lowdb.data[boardId].columns &&
        lowdb.data[boardId].columns[columnId]
      ) {
        if (!lowdb.data[boardId].columns[columnId].taskIdList) {
          lowdb.data[boardId].columns[columnId].taskIdList = [];
        }
        lowdb.data[boardId].columns[columnId].taskIdList.push(task.id);
      }
      await lowdb.write();
      return task;
    } catch (error) {
      throw error;
    }
  },
  update: async (boardId, id, data, userId) => {
    try {
      await lowdb.read();
      if (!lowdb.data[boardId].tasks || !(id in lowdb.data[boardId].tasks)) {
        throw new NotFoundError("Task", id);
      }
      const task = new Task(lowdb.data[boardId].tasks[id]);
      task.update(data, userId);
      lowdb.data[boardId].tasks[id] = task.toObject();
      await lowdb.write();
      return task;
    } catch (error) {
      throw error;
    }
  },
  delete: async (boardId, id) => {
    try {
      await lowdb.read();
      if (!lowdb.data[boardId].tasks || !(id in lowdb.data[boardId].tasks)) {
        throw new NotFoundError("Task", id);
      }
      const task = new Task(lowdb.data[boardId].tasks[id]);
      delete lowdb.data[boardId].tasks[id];
      await lowdb.write();
      return task;
    } catch (error) {
      throw error;
    }
  },
};

export default TaskService;
