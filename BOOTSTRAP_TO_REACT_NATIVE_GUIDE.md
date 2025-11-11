# Converting Bootstrap Web App to React Native

## 🔄 **Bootstrap to React Native Conversion Guide**

### **Key Differences Overview**

| Bootstrap Web | React Native | Notes |
|---------------|--------------|-------|
| `<div>` | `<View>` | Container elements |
| `<span>`, `<p>` | `<Text>` | Text elements |
| `<input>` | `<TextInput>` | Form inputs |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` | Interactive elements |
| `<img>` | `<Image>` | Images |
| `<ul>`, `<li>` | `<FlatList>` or `<ScrollView>` | Lists |
| CSS Classes | StyleSheet objects | Styling |
| onClick | onPress | Touch events |
| HTML forms | React Native forms | Form handling |

### **1. Component Structure Conversion**

#### **Bootstrap HTML Structure**
```html
<div class="mobile-container">
    <div class="top-bar">
        <h5>Title</h5>
        <i class="bi bi-cart3"></i>
    </div>
    <div class="screen active">
        <input type="email" class="form-control" />
        <button class="btn btn-primary">Submit</button>
    </div>
</div>
```

#### **React Native Equivalent**
```jsx
<View style={styles.mobileContainer}>
    <View style={styles.topBar}>
        <Text style={styles.title}>Title</Text>
        <TouchableOpacity>
            <Icon name="shopping-cart" size={24} />
        </TouchableOpacity>
    </View>
    <View style={styles.screen}>
        <TextInput 
            style={styles.formControl}
            keyboardType="email-address"
        />
        <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
    </View>
</View>
```

### **2. Styling Conversion**

#### **Bootstrap CSS**
```css
.mobile-container {
    max-width: 390px;
    margin: 0 auto;
    background: white;
    min-height: 100vh;
}

.btn-primary {
    background-color: #e53e3e;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
}
```

#### **React Native StyleSheet**
```jsx
const styles = StyleSheet.create({
    mobileContainer: {
        maxWidth: 390,
        backgroundColor: 'white',
        minHeight: '100%',
        alignSelf: 'center',
    },
    btnPrimary: {
        backgroundColor: '#e53e3e',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
```

### **3. Navigation Conversion**

#### **Bootstrap JavaScript Navigation**
```javascript
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName + 'Screen').classList.add('active');
}
```

#### **React Navigation**
```jsx
// Install: npm install @react-navigation/native @react-navigation/stack
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Products" component={ProductsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

### **4. State Management Conversion**

#### **Bootstrap localStorage**
```javascript
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
localStorage.setItem('currentUser', JSON.stringify(currentUser));
```

#### **React Native AsyncStorage + Redux**
```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';

// In component
const currentUser = useSelector(state => state.auth.currentUser);
const dispatch = useDispatch();

// Store data
const storeUser = async (user) => {
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    dispatch(setCurrentUser(user));
};
```

## **Complete Conversion Examples**

### **Login Screen Conversion**