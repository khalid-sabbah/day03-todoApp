import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet , Modal , ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const showDeleteConfirmation = (id) => {
  setSelectedTodoId(id);
  setIsModalVisible(true);
};

const confirmDelete = () => {
  removeTodo(selectedTodoId);
  setIsModalVisible(false);
}; 

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const savedTodos = await AsyncStorage.getItem('todos');
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error('Failed to load todos', error);
    }
  };

  const saveTodos = async (newTodos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error('Failed to save todos', error);
    }
  };

  const addTodo = () => {
    if (title && description) {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        status: 'active',
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveTodos(updatedTodos);
      setTitle('');
      setDescription('');
    }
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const markAsDone = async (id) => {
    const todoToMark = todos.find(todo => todo.id === id);
    if (todoToMark) {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      saveTodos(updatedTodos);

      // Save the completed task to AsyncStorage (for CompletedTasksScreen)
      try {
        const completedTodos = await AsyncStorage.getItem('completedTodos');
        const parsedCompletedTodos = completedTodos ? JSON.parse(completedTodos) : [];
        parsedCompletedTodos.push({ ...todoToMark, status: 'done' });
        await AsyncStorage.setItem('completedTodos', JSON.stringify(parsedCompletedTodos));
      } catch (error) {
        console.error('Failed to save completed todos', error);
      }
    }
  };

  const renderTodo = ({ item }) => (
    <TouchableOpacity
    style={styles.todoItem}
    onPress={() => navigation.navigate('TodoDetails', { title: item.title, description: item.description })}
  >
    <Text style={styles.todoTitle}>{item.title}</Text>
    <Text>{item.description}</Text>
    <View style={styles.actions}>
      <Button title="Done" onPress={() => markAsDone(item.id)} />
      <Button title="Delete" onPress={() => showDeleteConfirmation(item.id)} />
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderTodo}
      />

<Modal
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Are you sure you want to delete this task?</Text>
          <View style={styles.modalActions}>
            <Button title="Yes" onPress={confirmDelete} />
            <Button title="No" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20 ,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: 'column', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default HomeScreen;
