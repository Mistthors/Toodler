import AsyncStorage from '@react-native-async-storage/async-storage';
import dataJson from '../assets/data.json';

const STORAGE_KEY = '@toodler_data';

// Initialize data in memory
let appData = {
  boards: [...dataJson.boards],
  lists: [...dataJson.lists],
  tasks: [...dataJson.tasks]
};

// Load data from AsyncStorage
export const loadDataFromStorage = async () => {
  try {
    const storedData = await AsyncStorage.getItem(STORAGE_KEY);
    if (storedData !== null) {
      appData = JSON.parse(storedData);
      console.log('Data loaded from storage');
    } else {
      // First time - save initial data
      await saveDataToStorage();
      console.log('Initial data saved to storage');
    }
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

// Save data to AsyncStorage
const saveDataToStorage = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    console.log('Data saved to storage');
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

// Get next available ID
const getNextId = (items) => {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
};

// Boards
export const getBoards = () => appData.boards;

export const createBoard = async (name, description, thumbnailPhoto) => {
  const newBoard = {
    id: getNextId(appData.boards),
    name,
    description: description || '',
    thumbnailPhoto: thumbnailPhoto || 'https://via.placeholder.com/400x150'
  };
  appData.boards.push(newBoard);
  await saveDataToStorage();
  return newBoard;
};

export const updateBoard = async (boardId, name, description, thumbnailPhoto) => {
  const board = appData.boards.find(b => b.id === boardId);
  if (board) {
    board.name = name;
    board.description = description;
    board.thumbnailPhoto = thumbnailPhoto;
    await saveDataToStorage();
  }
  return board;
};

export const deleteBoard = async (boardId) => {
  appData.boards = appData.boards.filter(board => board.id !== boardId);
  // Also delete associated lists and tasks
  const listsToDelete = appData.lists.filter(list => list.boardId === boardId);
  for (const list of listsToDelete) {
    await deleteList(list.id, false); // Don't save yet
  }
  await saveDataToStorage();
};

// Lists
export const getLists = (boardId) => {
  return appData.lists.filter(list => list.boardId === boardId);
};

export const createList = async (name, color, boardId) => {
  const newList = {
    id: getNextId(appData.lists),
    name,
    color: color || '#ffffff',
    boardId
  };
  appData.lists.push(newList);
  await saveDataToStorage();
  return newList;
};

export const updateList = async (listId, name, color) => {
  const list = appData.lists.find(l => l.id === listId);
  if (list) {
    list.name = name;
    list.color = color;
    await saveDataToStorage();
  }
  return list;
};

export const deleteList = async (listId, shouldSave = true) => {
  appData.lists = appData.lists.filter(list => list.id !== listId);
  // Also delete associated tasks
  appData.tasks = appData.tasks.filter(task => task.listId !== listId);
  if (shouldSave) {
    await saveDataToStorage();
  }
};

// Tasks
export const getTasks = (listId) => {
  return appData.tasks.filter(task => task.listId === listId);
};

export const createTask = async (name, description, listId, dueDate, priority) => {
  const newTask = {
    id: getNextId(appData.tasks),
    name,
    description: description || '',
    isFinished: false,
    listId,
    dueDate: dueDate || null,
    priority: priority || 'None'
  };
  appData.tasks.push(newTask);
  await saveDataToStorage();
  return newTask;
};

export const updateTask = async (taskId, name, description, dueDate, priority) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.name = name;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    await saveDataToStorage();
  }
  return task;
};

export const deleteTask = async (taskId) => {
  appData.tasks = appData.tasks.filter(task => task.id !== taskId);
  await saveDataToStorage();
};

export const moveTask = async (taskId, newListId) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.listId = newListId;
    await saveDataToStorage();
  }
  return task;
};

export const toggleTaskFinished = async (taskId) => {
  const task = appData.tasks.find(t => t.id === taskId);
  if (task) {
    task.isFinished = !task.isFinished;
    await saveDataToStorage();
  }
  return task;
};

export const getAllData = () => appData;

// Reset data to initial state
export const resetData = async () => {
  appData = {
    boards: [...dataJson.boards],
    lists: [...dataJson.lists],
    tasks: [...dataJson.tasks]
  };
  await saveDataToStorage();
  console.log('Data reset to initial state');
};