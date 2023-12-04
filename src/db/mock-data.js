const data = {
  tasks: {
    "t-1": {
      id: "t-1",
      title: "let's make some card",
      description: "asadjglksfjgkldafs",
      status: "high",
      column: "c-1",
      order: 1,
      isArchived: false,
    },
    "t-2": { id: "t-2", title: "b/a", description: "12313245543" },
    "t-3": {
      id: "t-3",
      title: "Bonan Vesperon, Ĉiuj!",
      description: "Kiel vi fartas?",
    },
  },
  columns: {
    "c-1": { id: "c-1", title: "Col 1", taskIdList: ["t-1", "t-2", "t-3"] },
    "c-2": { id: "c-2", title: "Col 2", taskIdList: [] },
    "c-3": { id: "c-3", title: "Col 3", taskIdList: [] },
  },
  columnOrder: ["c-1", "c-2", "c-3"],
};

export default data;
