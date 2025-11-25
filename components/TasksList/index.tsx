import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getTasks, createTask, toggleTaskFinished, deleteTask, moveTask, getLists, updateTask } from '../../utils/dataManager';
import styles from './style';

interface Task {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
  dueDate?: string | null;
  priority?: string;
}

interface List {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

export default function TasksList() {
  const { listId, listName, boardId } = useLocalSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [availableLists, setAvailableLists] = useState<List[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState<Date | null>(null);
  const [showNewDatePicker, setShowNewDatePicker] = useState(false);
  const [newTaskPriority, setNewTaskPriority] = useState('None');
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [editTaskListId, setEditTaskListId] = useState<number>(0);
  const [editTaskDueDate, setEditTaskDueDate] = useState<Date | null>(null);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);
  const [editTaskPriority, setEditTaskPriority] = useState('None');

  const loadTasks = () => {
    setTasks(getTasks(Number(listId)));
  };

  const loadAvailableLists = () => {
    const allLists = getLists(Number(boardId));
    setAvailableLists(allLists);
  };

  useEffect(() => {
    loadTasks();
    loadAvailableLists();
  }, [listId, boardId]);

  const handleCreateTask = () => {
    if (!newTaskName.trim()) {
      Alert.alert('Error', 'Task name is required');
      return;
    }

    createTask(newTaskName, newTaskDescription, Number(listId), newTaskDueDate?.toISOString(), newTaskPriority);
    loadTasks();
    setModalVisible(false);
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskDueDate(null);
    setNewTaskPriority('None');
  };

  const handleToggleTask = (taskId: number) => {
    toggleTaskFinished(taskId);
    loadTasks();
  };

  const handleDeleteTask = (taskId: number) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            loadTasks();
          }
        }
      ]
    );
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setEditTaskName(task.name);
    setEditTaskDescription(task.description);
    setEditTaskListId(task.listId);
    setEditTaskDueDate(task.dueDate ? new Date(task.dueDate) : null);
    setEditTaskPriority(task.priority || 'None');
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editTaskName.trim()) {
      Alert.alert('Error', 'Task name is required');
      return;
    }

    if (selectedTask) {
      updateTask(selectedTask.id, editTaskName, editTaskDescription, editTaskDueDate?.toISOString(), editTaskPriority);
      
      if (editTaskListId !== selectedTask.listId) {
        moveTask(selectedTask.id, editTaskListId);
      }
      
      loadTasks();
      setEditModalVisible(false);
      setSelectedTask(null);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return '#FF3B30';
      case 'Medium': return '#FF9500';
      case 'Low': return '#34C759';
      default: return '#999';
    }
  };

  const renderTask = ({ item }: { item: Task }) => {
    const overdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.isFinished;
    
    return (
      <View style={[styles.taskCard, item.isFinished && styles.taskCardFinished]}>
        <TouchableOpacity 
          style={styles.taskContent}
          onPress={() => handleToggleTask(item.id)}
        >
          <View style={styles.taskHeader}>
            <Text style={[styles.taskName, item.isFinished && styles.taskNameFinished]}>
              {item.name}
            </Text>
            <View style={styles.badges}>
              {item.priority && item.priority !== 'None' && (
                <Text style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
                  {item.priority}
                </Text>
              )}
              {item.isFinished && (
                <Text style={styles.finishedBadge}>✓ Done</Text>
              )}
            </View>
          </View>
          <Text style={[styles.taskDescription, item.isFinished && styles.taskDescriptionFinished]}>
            {item.description}
          </Text>
          {item.dueDate && (
            <Text style={[styles.dueDate, overdue && styles.overdue]}>
              Due: {formatDate(item.dueDate)}
            </Text>
          )}
        </TouchableOpacity>
        <View style={styles.taskButtons}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => handleEditTask(item)}
          >
            <Text style={styles.editButtonText}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButtonTask}
            onPress={() => handleDeleteTask(item.id)}
          >
            <Text style={styles.deleteButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const unfinishedTasks = tasks.filter(task => !task.isFinished);
  const finishedTasks = tasks.filter(task => task.isFinished);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{listName}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Unfinished Tasks */}
        {unfinishedTasks.map(task => (
          <View key={task.id}>
            {renderTask({ item: task })}
          </View>
        ))}
        
        {/* Done Section */}
        {finishedTasks.length > 0 && (
          <>
            <View style={styles.doneSectionHeader}>
              <Text style={styles.doneSectionTitle}>Done ({finishedTasks.length})</Text>
            </View>
            {finishedTasks.map(task => (
              <View key={task.id}>
                {renderTask({ item: task })}
              </View>
            ))}
          </>
        )}
      </ScrollView>

      {/* Create Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Create New Task</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Task Name *"
                placeholderTextColor="#999"
                value={newTaskName}
                onChangeText={setNewTaskName}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description (optional)"
                placeholderTextColor="#999"
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
                multiline
                numberOfLines={4}
              />

              <Text style={styles.dateLabel}>Due Date (optional):</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowNewDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {newTaskDueDate ? formatDate(newTaskDueDate.toISOString()) : 'Select Date'}
                </Text>
              </TouchableOpacity>

              {showNewDatePicker && (
                <DateTimePicker
                  value={newTaskDueDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowNewDatePicker(false);
                    if (selectedDate) {
                      setNewTaskDueDate(selectedDate);
                    }
                  }}
                />
              )}

              {newTaskDueDate && (
                <TouchableOpacity 
                  style={styles.clearDateButton}
                  onPress={() => setNewTaskDueDate(null)}
                >
                  <Text style={styles.clearDateText}>Clear Date</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.priorityLabel}>Priority:</Text>
              <View style={styles.priorityButtons}>
                {['High', 'Medium', 'Low', 'None'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      newTaskPriority === priority && styles.priorityButtonSelected,
                      { borderColor: priority === 'High' ? '#FF3B30' : priority === 'Medium' ? '#FF9500' : priority === 'Low' ? '#34C759' : '#999' }
                    ]}
                    onPress={() => setNewTaskPriority(priority)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      newTaskPriority === priority && styles.priorityButtonTextSelected
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.createButton]}
                  onPress={handleCreateTask}
                >
                  <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Task Name *"
                placeholderTextColor="#999"
                value={editTaskName}
                onChangeText={setEditTaskName}
              />
              
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description (optional)"
                placeholderTextColor="#999"
                value={editTaskDescription}
                onChangeText={setEditTaskDescription}
                multiline
                numberOfLines={4}
              />

              <Text style={styles.dateLabel}>Due Date (optional):</Text>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowEditDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {editTaskDueDate ? formatDate(editTaskDueDate.toISOString()) : 'Select Date'}
                </Text>
              </TouchableOpacity>

              {showEditDatePicker && (
                <DateTimePicker
                  value={editTaskDueDate || new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEditDatePicker(false);
                    if (selectedDate) {
                      setEditTaskDueDate(selectedDate);
                    }
                  }}
                />
              )}

              {editTaskDueDate && (
                <TouchableOpacity 
                  style={styles.clearDateButton}
                  onPress={() => setEditTaskDueDate(null)}
                >
                  <Text style={styles.clearDateText}>Clear Date</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.priorityLabel}>Priority:</Text>
              <View style={styles.priorityButtons}>
                {['High', 'Medium', 'Low', 'None'].map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityButton,
                      editTaskPriority === priority && styles.priorityButtonSelected,
                      { borderColor: priority === 'High' ? '#FF3B30' : priority === 'Medium' ? '#FF9500' : priority === 'Low' ? '#34C759' : '#999' }
                    ]}
                    onPress={() => setEditTaskPriority(priority)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      editTaskPriority === priority && styles.priorityButtonTextSelected
                    ]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.listLabel}>Move to List:</Text>
              {availableLists.map((list) => (
                <TouchableOpacity
                  key={list.id}
                  style={[
                    styles.listOption, 
                    { borderLeftColor: list.color, borderLeftWidth: 5 },
                    editTaskListId === list.id && styles.selectedListOption
                  ]}
                  onPress={() => setEditTaskListId(list.id)}
                >
                  <Text style={styles.listOptionText}>{list.name}</Text>
                  {editTaskListId === list.id && (
                    <Text style={styles.selectedCheckmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}

              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.createButton]}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.createButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}