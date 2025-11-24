import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import data from '../../assets/data.json';
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
  const router = useRouter();

  useEffect(() => {
    const boardLists = data.lists.filter(list => list.boardId === Number(boardId));
    setLists(boardLists);
  }, [boardId]);

  const renderList = ({ item }: { item: List }) => (
    <TouchableOpacity 
      style={[styles.listCard, { borderLeftColor: item.color, borderLeftWidth: 5 }]}
      onPress={() => router.push(`/tasks?listId=${item.id}&listName=${item.name}`)}
    >
      <Text style={styles.listName}>{item.name}</Text>
      <Text style={styles.taskCount}>
        {data.tasks.filter(task => task.listId === item.id).length} tasks
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{boardName}</Text>
      <FlatList
        data={lists}
        renderItem={renderList}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}