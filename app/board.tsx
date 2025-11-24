// import React from 'react';
// import Board from '../components/Board';

// export default function BoardScreen() {
//   return <Board />;
// }

import React from 'react';
import { Stack } from 'expo-router';
import Board from '../components/Board';

export default function BoardScreen() {
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
      <Board />
    </>
  );
}