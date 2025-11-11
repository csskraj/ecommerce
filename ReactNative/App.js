import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import Redux store
import { store, persistor } from './store/store';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#e53e3e" />
    <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>Loading...</Text>
  </View>
);

// Auth Stack Navigator
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#e53e3e' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ title: 'Create Account' }}
    />
    <Stack.Screen 
      name="ForgotPassword" 
      component={ForgotPasswordScreen}
      options={{ title: 'Reset Password' }}
    />
  </Stack.Navigator>
);

// Products Stack Navigator
const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#e53e3e' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="ProductsList" 
      component={ProductsScreen}
      options={{ title: 'Products' }}
    />
    <Stack.Screen 
      name="ProductDetail" 
      component={ProductDetailScreen}
      options={{ title: 'Product Details' }}
    />
  </Stack.Navigator>
);

// Cart Stack Navigator
const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#e53e3e' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="CartList" 
      component={CartScreen}
      options={{ title: 'Shopping Cart' }}
    />
    <Stack.Screen 
      name="Checkout" 
      component={CheckoutScreen}
      options={{ title: 'Checkout' }}
    />
  </Stack.Navigator>
);

// Profile Stack Navigator
const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#e53e3e' },
      headerTintColor: 'white',
      headerTitleStyle: { fontWeight: 'bold' },
    }}
  >
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen 
      name="OrderHistory" 
      component={OrderHistoryScreen}
      options={{ title: 'Order History' }}
    />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Products':
            iconName = 'shopping-bag';
            break;
          case 'Cart':
            iconName = 'shopping-cart';
            break;
          case 'Profile':
            iconName = 'person';
            break;
          default:
            iconName = 'help';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#e53e3e',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      headerShown: false,
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        tabBarBadge: null, // You can add badge for notifications
      }}
    />
    <Tab.Screen 
      name="Products" 
      component={ProductsStack}
    />
    <Tab.Screen 
      name="Cart" 
      component={CartStack}
      options={{
        tabBarBadge: 0, // This will be updated with cart item count
      }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileStack}
    />
  </Tab.Navigator>
);

// Root Navigator
const RootNavigator = () => {
  // Skip authentication - always go to main app
  // Authentication screens are still available via Profile tab
  const isAuthenticated = true; // Always authenticated (skip login screen)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;