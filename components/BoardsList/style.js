import { StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const styles = StyleSheet.create({
  ...commonStyles,
  
  // Board-specific styles
  boardCard: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  boardContent: {
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  boardInfo: {
    padding: 16,
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  boardDescription: {
    fontSize: 14,
    color: '#666',
  },
  editButtonBoard: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: -8,
    marginBottom: 8,
  },
  keyboardAvoidingContainer: {
  flex: 1,
},
});


export default styles;