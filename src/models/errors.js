class NotFoundError extends Error {
  constructor(dataType, dataId) {
    super();
    this.message = `${dataType} with id: ${dataId} not found.`;
  }
}

class CantDeleteError extends Error {
  constructor(dataType, dataId, reason = undefined) {
    super();
    this.message = `Cannot delete ${dataType} with id: ${dataId}.`;
    if (reason) this.reason = reason;
  }
}

export { NotFoundError, CantDeleteError };
