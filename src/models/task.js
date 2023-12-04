import { v4 as uuidv4 } from "uuid";

class Task {
  constructor(task, userId = undefined) {
    const {
      id,
      title,
      description,
      isOpen,
      columnId,
      order,
      isArchived,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy,
    } = task;
    const now = new Date();
    this.id = id || uuidv4();
    this.title = title;
    this.description = description;
    this.isOpen = isOpen || true;
    this.columnId = columnId || null;
    this.order = order;
    this.isArchived = isArchived || false;
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

  setIsArchive(newIsArchive, userId) {
    if (this.isArchived == newIsArchive) return;
    this.update({ isArchived: newIsArchive }, userId);
  }

  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      isOpen: this.isOpen,
      columnId: this.columnId,
      order: this.order,
      isArchived: this.isArchived,
      createdAt: this.createdAt.toISOString(),
      createdBy: this.createdBy,
      modifiedAt: this.modifiedAt.toISOString(),
      modifiedBy: this.modifiedBy,
    };
  }
}

export default Task;
