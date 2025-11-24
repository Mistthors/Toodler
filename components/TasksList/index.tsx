import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import data from '../../assets/data.json';
import styles from './style';

interface Task {
  id: number;
  name: string;
  description: string;
  isFinished: boolean;
  listId: number;
}

export default function TasksList() {
  const { listId, listName } = useLocalSearchParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const listTasks = data.tasks.filter(task => task.listId === Number(listId));
    setTasks(listTasks);
  }, [listId]);

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <Text style={styles.taskName}>{item.name}</Text>
        {item.isFinished && (
          <Text style={styles.finishedBadge}>✓ Done</Text>
        )}
      </View>
      <Text style={styles.taskDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{listName}</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}