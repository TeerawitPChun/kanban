import { v4 as uuidv4 } from "uuid";

class Column {
  constructor(column, userId = undefined) {
    const {
      id,
      title,
      order,
      boardId,
      taskIdList,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy,
    } = column;
    const now = new Date();
    this.id = id || uuidv4();
    this.title = title;
    this.order = order;
    this.boardId = boardId || null;
    this.taskIdList = taskIdList || [];
    this.createdAt = (createdAt && new Date(createdAt)) || now;
    this.createdBy = createdBy || userId;
    this.modifiedAt = (modifiedAt && new Date(modifiedAt)) || now;
    this.modifiedBy = modifiedBy || userId;
  }

  update(kwargs, userId, modifiedAt=undefined) {
    for (let key in kwargs) {
      this[key] = kwargs[key];
    }
    this.modifiedAt = modifiedAt || new Date();
    this.modifiedBy = userId;
  }

  updateTaskList(taskIdList, userId, modifiedAt=undefined) {
    this.update({ taskIdList: taskIdList }, userId, modifiedAt);
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      boardId: this.boardId,
      taskIdList: this.taskIdList,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      modifiedAt: this.modifiedAt.toISOString(),
      modifiedBy: this.modifiedBy,
    };
  }
}

export default Column;
