import { StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const styles = StyleSheet.create({
  ...commonStyles,
  
  // List-specific styles
  listCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listContent: {
    flex: 1,
  },
  listName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  taskCount: {
    fontSize: 14,
    color: '#666',
  },
  listButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonTextList: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  deleteBoardButton: {
    backgroundColor: '#f06861ff',
    padding: 16,
    margin: 50,
    borderRadius: 8,
    alignItems: 'center',

  },
  deleteBoardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
});

export default styles;