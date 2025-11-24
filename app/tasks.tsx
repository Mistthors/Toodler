// import React from 'react';
// import TasksList from '../components/TasksList';

// export default function TasksScreen() {
//   return <TasksList />;
// }

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
            backgroundColor: '#007AFF',
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