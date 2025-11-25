import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, Modal, Alert, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getBoards, createBoard, deleteBoard, updateBoard } from '../../utils/dataManager';
import styles from './style';

interface Board {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
}

export default function BoardsList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [newBoardPhoto, setNewBoardPhoto] = useState('');
  const [editBoardName, setEditBoardName] = useState('');
  const [editBoardDescription, setEditBoardDescription] = useState('');
  const [editBoardPhoto, setEditBoardPhoto] = useState('');
  const [newBoardPhotoPreview, setNewBoardPhotoPreview] = useState<string | null>(null);
  const [editBoardPhotoPreview, setEditBoardPhotoPreview] = useState<string | null>(null);
  const router = useRouter();

  const loadBoards = () => {
    setBoards(getBoards());
  };

  useFocusEffect(
    React.useCallback(() => {
      loadBoards();
    }, [])
  );

  async function handlePickImageCreate() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Allow access to photos to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setNewBoardPhoto(result.assets[0].uri);
      setNewBoardPhotoPreview(result.assets[0].uri);
    }
  }

  async function handlePickImageEdit() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Allow access to photos to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setEditBoardPhoto(result.assets[0].uri);
      setEditBoardPhotoPreview(result.assets[0].uri);
    }
  }

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      Alert.alert('Error', 'Board name is required');
      return;
    }

    createBoard(newBoardName, newBoardDescription, newBoardPhoto);
    loadBoards();
    setModalVisible(false);
    setNewBoardName('');
    setNewBoardDescription('');
    setNewBoardPhoto('');
    setNewBoardPhotoPreview(null);
  };

  const handleEditBoard = (board: Board) => {
    setSelectedBoard(board);
    setEditBoardName(board.name);
    setEditBoardDescription(board.description);
    setEditBoardPhoto(board.thumbnailPhoto);
    setEditBoardPhotoPreview(board.thumbnailPhoto);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editBoardName.trim()) {
      Alert.alert('Error', 'Board name is required');
      return;
    }

    if (selectedBoard) {
      updateBoard(selectedBoard.id, editBoardName, editBoardDescription, editBoardPhoto);
      setEditModalVisible(false);
      setSelectedBoard(null);
      setBoards([]);
      setTimeout(() => {
        loadBoards();
      }, 10);
    }
  };

  const renderBoard = ({ item }: { item: Board }) => (
    <View style={styles.boardCard}>
      <TouchableOpacity 
        style={styles.boardContent}
        onPress={() => router.push(`/board?boardId=${item.id}&boardName=${item.name}`)}
      >
        <Image 
          source={{ uri: item.thumbnailPhoto }} 
          style={styles.thumbnail}
        />
        <View style={styles.boardInfo}>
          <Text style={styles.boardTitle}>{item.name}</Text>
          <Text style={styles.boardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.editButtonBoard}
        onPress={() => handleEditBoard(item)}
      >
        <Text style={styles.editButtonText}>✎</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Boards</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Board</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={boards}
        renderItem={renderBoard}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Create Board Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Board</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Board Name *"
              placeholderTextColor="#999"
              value={newBoardName}
              onChangeText={setNewBoardName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              value={newBoardDescription}
              onChangeText={setNewBoardDescription}
              multiline
            />
            
            <View style={{ marginBottom: 12 }}>
              <Text style={{ marginBottom: 8, fontWeight: '600' }}>Thumbnail Image:</Text>
              {newBoardPhotoPreview ? (
                <Image source={{ uri: newBoardPhotoPreview }} style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }} />
              ) : null}
              <Button title="Pick Image from Device" onPress={handlePickImageCreate} />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Or paste Image URL"
              placeholderTextColor="#999"
              value={newBoardPhoto}
              onChangeText={setNewBoardPhoto}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.createButton]}
                onPress={handleCreateBoard}
              >
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Board Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Board</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Board Name *"
              placeholderTextColor="#999"
              value={editBoardName}
              onChangeText={setEditBoardName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Description (optional)"
              placeholderTextColor="#999"
              value={editBoardDescription}
              onChangeText={setEditBoardDescription}
              multiline
            />
            
            <View style={{ marginBottom: 12 }}>
              <Text style={{ marginBottom: 8, fontWeight: '600' }}>Thumbnail Image:</Text>
              {editBoardPhotoPreview ? (
                <Image source={{ uri: editBoardPhotoPreview }} style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 8 }} />
              ) : null}
              <Button title="Pick Image from Device" onPress={handlePickImageEdit} />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Or paste Image URL"
              placeholderTextColor="#999"
              value={editBoardPhoto}
              onChangeText={setEditBoardPhoto}
            />

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