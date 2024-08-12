import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet , ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CompletedTasksScreen = ({ navigation }) => {
  const [completedTodos, setCompletedTodos] = useState([]);

  useEffect(() => {
    loadCompletedTodos();
  }, []);

  const loadCompletedTodos = async () => {
    try {
      const savedCompletedTodos = await AsyncStorage.getItem('completedTodos');
      if (savedCompletedTodos) {
        setCompletedTodos(JSON.parse(savedCompletedTodos));
      }
    } catch (error) {
      console.error('Failed to load completed todos', error);
    }
  };

  const renderCompletedTodo = ({ item }) => (
    <TouchableOpacity
      style={styles.todoItem}
      onPress={() => navigation.navigate('TodoDetails', { title: item.title, description: item.description })}
    >
      <Text style={styles.todoTitle}>{item.title}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
   
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks</Text>
      <FlatList
        data={completedTodos}
        keyExtractor={item => item.id}
        renderItem={renderCompletedTodo}
      />
    </View>    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#d4edda',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: '#6c757d',
  },
});

export default CompletedTasksScreen;
