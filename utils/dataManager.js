import dataJson from '../assets/data.json';

// Initialize data in memory
let appData = {
  boards: [...dataJson.boards],
  lists: [...dataJson.lists],
  tasks: [...dataJson.tasks]
};

// Get next available ID
const getNextId = (items) => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

// Boards
export const getBoards = () => appData.boards;

export const createBoard = (name, description, thumbnailPhoto) => {
  const newBoard = {
    id: getNextId(appData.boards),
    name,
    description: description || '',
    thumbnailPhoto: thumbnailPhoto || 'https://via.placeholder.com/400x150'
  };
  appData.boards.push(newBoard);
  return newBoard;
};

export const updateBoard = (boardId, name, description, thumbnailPhoto) => {
  const board = appData.boards.find(b => b.id === boardId);
  if (board) {
    board.name = name;
    board.description = description;
    board.thumbnailPhoto = thumbnailPhoto;
  }
  return board;
};

export const deleteBoard = (boardId) => {
  appData.boards = appData.boards.filter(board => board.id !== boardId);
  // Also delete associated lists and tasks
  const listsToDelete = appData.lists.filter(list => list.boardId === boardId);
  listsToDelete.forEach(list => {
    deleteList(list.id);
  });
};

// Lists
export const getLists = (boardId) => {
  return appData.lists.filter(list => list.boardId === boardId);
};

export const createList = (name, color, boardId) => {
  const newList = {
    id: getNextId(appData.lists),
    name,
    color: color || '#ffffff',
    boardId
  };
  appData.lists.push(newList);
  return newList;
};

export const updateList = (listId, name, color) => {
  const list = appData.lists.find(l => l.id === listId);
  if (list) {
    list.name = name;
    list.color = color;
  }
  return list;
};

export const deleteList = (listId) => {
  appData.lists = appData.lists.filter(list => list.id !== listId);
  // Also delete associated tasks
  appData.tasks = appData.tasks.filter(task => task.listId !== listId);
};

// Tasks
export const getTasks = (listId) => {
  return appData.tasks.filter(task => task.listId === listId);
};

export const createTask = (name, description, listId) => {
  const newTask = {
    id: getNextId(appData.tasks),
    name,
    description: description || '',
    isFinished: false,
    listId
  };
  appData.tasks.push(newTask);
  return newTask;
};

export const updateTask = (taskId, name, description) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.name = name;
    task.description = description;
  }
  return task;
};

export const deleteTask = (taskId) => {
  appData.tasks = appData.tasks.filter(task => task.id !== taskId);
};

export const moveTask = (taskId, newListId) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.listId = newListId;
  }
  return task;
};

export const toggleTaskFinished = (taskId) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.isFinished = !task.isFinished;
  }
  return task;
};

export const getAllData = () => appData;