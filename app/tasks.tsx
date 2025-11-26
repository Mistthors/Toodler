import React from 'react';
import { Stack } from 'expo-router';
import TasksList from '../components/TasksList';

export default function TasksScreen() {
  return (
    <>
      <Stack.Screen 
        options={{
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: '#8995ffff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <TasksList />
    </>
  );
}