import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getLists, createList, deleteList, deleteBoard, getTasks, updateList } from '../../utils/dataManager';
import styles from './style';

interface List {
  id: number;
  name: string;
  color: string;
  boardId: number;
}

export default function Board() {
  const { boardId, boardName } = useLocalSearchParams();
  const [lists, setLists] = useState<List[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [newListName, setNewListName] = useState('');
  const [newListColor, setNewListColor] = useState('#ffffff');
  const [editListName, setEditListName] = useState('');
  const [editListColor, setEditListColor] = useState('#ffffff');
  const router = useRouter();

  const loadLists = () => {
    setLists(getLists(Number(boardId)));
  };

  useEffect(() => {
    loadLists();
  }, [boardId]);

  const handleCreateList = () => {
    if (!newListName.trim()) {
      Alert.alert('Error', 'List name is required');
      return;
    }

    createList(newListName, newListColor, Number(boardId));
    loadLists();
    setModalVisible(false);
    setNewListName('');
    setNewListColor('#ffffff');
  };

  const handleDeleteList = (listId: number) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list? This will also delete all tasks.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteList(listId);
            loadLists();
          }
        }
      ]
    );
  };

  const handleDeleteBoard = () => {
    Alert.alert(
      'Delete Board',
      'Are you sure you want to delete this board? This will also delete all lists and tasks.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteBoard(Number(boardId));
            router.back();
          }
        }
      ]
    );
  };

  const handleEditList = (list: List) => {
    setSelectedList(list);
    setEditListName(list.name);
    setEditListColor(list.color);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editListName.trim()) {
      Alert.alert('Error', 'List name is required');
      return;
    }

    if (selectedList) {
      updateList(selectedList.id, editListName, editListColor);
      loadLists();
      setEditModalVisible(false);
      setSelectedList(null);
    }
  };

  const renderList = ({ item }: { item: List }) => (
    <View style={[styles.listCard, { borderLeftColor: item.color, borderLeftWidth: 5 }]}>
      <TouchableOpacity 
        style={styles.listContent}
        onPress={() => router.push(`/tasks?listId=${item.id}&listName=${item.name}&boardId=${boardId}`)}
      >
        <Text style={styles.listName}>{item.name}</Text>
        <Text style={styles.taskCount}>
          {getTasks(item.id).length} tasks
        </Text>
      </TouchableOpacity>
      <View style={styles.listButtons}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditList(item)}
        >
          <Text style={styles.editButtonTextList}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDeleteList(item.id)}
        >
          <Text style={styles.deleteButtonText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const colors = [
    '#ffffff', '#00ff00', '#dddddd', '#cccccc', 
    '#555555', '#ff0000', '#0000ff', '#ff00ff',
    '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE'
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{boardName}</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add List</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lists}
        renderItem={renderList}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity 
        style={styles.deleteBoardButton}
        onPress={() => handleDeleteBoard()}
      >
        <Text style={styles.deleteBoardButtonText}>Delete Board</Text>
      </TouchableOpacity>

      {/* Create List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New List</Text>
            
            <TextInput
              style={styles.input}
              placeholder="List Name *"
              placeholderTextColor="#999"
              value={newListName}
              onChangeText={setNewListName}
            />
            
            <Text style={styles.colorLabel}>Choose Color:</Text>
            <View style={styles.colorPicker}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    newListColor === color && styles.selectedColor
                  ]}
                  onPress={() => setNewListColor(color)}
                />
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
                onPress={handleCreateList}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit List Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit List</Text>
            
            <TextInput
              style={styles.input}
              placeholder="List Name *"
              placeholderTextColor="#999"
              value={editListName}
              onChangeText={setEditListName}
            />
            
            <Text style={styles.colorLabel}>Choose Color:</Text>
            <View style={styles.colorPicker}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    editListColor === color && styles.selectedColor
                  ]}
                  onPress={() => setEditListColor(color)}
                />
              ))}
            </View>

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
          </View>
        </View>
      </Modal>
    </View>
  );
}