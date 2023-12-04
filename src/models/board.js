import { v4 as uuidv4 } from "uuid";

class Board {
  constructor(data, userId = undefined) {
    const {
      id,
      title,
      columnIdList,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy,
    } = data;
    const now = new Date();
    this.id = id || uuidv4();
    this.title = title;
    this.columnIdList = columnIdList || [];
    this.createdAt = (createdAt && new Date(createdAt)) || now;
    this.createdBy = createdBy || userId;
    this.modifiedAt = (modifiedAt && new Date(modifiedAt)) || now;
    this.modifiedBy = modifiedBy || userId;
  }

  update(kwargs, userId) {
    for (let key in kwargs) {
      this[key] = kwargs[key];
    }
    this.modifiedAt = new Date();
    this.modifiedBy = userId;
  }

  updateColumnList(columnIdList, userId) {
    this.update({ columnIdList: columnIdList }, userId);
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      columnIdList: this.columnIdList,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      modifiedAt: this.modifiedAt.toISOString(),
      modifiedBy: this.modifiedBy,
    };
  }
}

export default Board;
