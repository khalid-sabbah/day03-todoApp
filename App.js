
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Screens/HomeScreen';
import TodoDetailsScreen from './Screens/TodoDetailsScreen';
import CompletedTasksScreen from './Screens/CompletedTasksScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'Home' }} 
    />
    <Stack.Screen 
      name="TodoDetails" 
      component={TodoDetailsScreen} 
      options={{ title: 'Todo Details' }} 
    />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Main" 
          component={MainStack} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Completed" 
          component={CompletedTasksScreen} 
          options={{
            tabBarLabel: 'Completed',
            tabBarIcon: ({ color, size }) => (
              <Icon name="checkmark-done-outline" color={color} size={size} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
