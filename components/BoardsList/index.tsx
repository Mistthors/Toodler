import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import data from '../../assets/data.json';
import styles from './style';

interface Board {
  id: number;
  name: string;
  description: string;
  thumbnailPhoto: string;
}

export default function BoardsList() {
  const [boards, setBoards] = useState<Board[]>([]);
  const router = useRouter();

  useEffect(() => {
    setBoards(data.boards);
  }, []);

    const renderBoard = ({ item }: { item: Board }) => (
    <TouchableOpacity 
        style={styles.boardCard}
        onPress={() =>
        router.push({
            pathname: '/board',
            params: { boardId: item.id.toString(), boardName: item.name }
        })
        }
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
    );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Boards</Text>
      <FlatList
        data={boards}
        renderItem={renderBoard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}