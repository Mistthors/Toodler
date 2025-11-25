import { StyleSheet } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

const styles = StyleSheet.create({
  ...commonStyles,
  
  // Task-specific styles
  taskCard: {
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
  },
  taskCardFinished: {
    backgroundColor: '#f0f0f0',
    opacity: 0.7,
  },
  taskContent: {
    flex: 1,
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  taskNameFinished: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  finishedBadge: {
    backgroundColor: '#4CAF50',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
  },
  taskDescriptionFinished: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  dueDate: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    fontWeight: '600',
  },
  overdue: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  doneSectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  doneSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  deleteButtonTask: {
    padding: 8,
  },
  listLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
    color: '#333',
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
    color: '#333',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  clearDateButton: {
    padding: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  clearDateText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  listOption: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedListOption: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
  },
  listOptionText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  selectedCheckmark: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default styles;