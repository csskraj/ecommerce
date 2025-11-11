import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProductsScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  const dispatch = useDispatch();
  const { products, filteredProducts } = useSelector(state => state.products);
  const { items: cartItems } = useSelector(state => state.cart);

  // Mock products data (same as your Bootstrap app)
  const mockProducts = [
    {id: 1, name: "iPhone 14 Pro", price: 999, category: "electronics", rating: 4.8, emoji: "📱", description: "Latest iPhone with Pro features"},
    {id: 2, name: "MacBook Air M2", price: 1299, category: "electronics", rating: 4.9, emoji: "💻", description: "Powerful laptop for professionals"},
    {id: 3, name: "Nike Air Max", price: 129, category: "clothing", rating: 4.5, emoji: "👟", description: "Comfortable running shoes"},
    {id: 4, name: "Levi's Jeans", price: 79, category: "clothing", rating: 4.3, emoji: "👖", description: "Classic denim jeans"},
    {id: 5, name: "JavaScript Guide", price: 29, category: "books", rating: 4.7, emoji: "📚", description: "Complete JavaScript programming guide"},
    // Add more products...
  ];

  const categories = [
    { id: 'all', name: 'All', icon: 'apps' },
    { id: 'electronics', name: 'Electronics', icon: 'smartphone' },
    { id: 'clothing', name: 'Clothing', icon: 'checkroom' },
    { id: 'books', name: 'Books', icon: 'book' },
    { id: 'home', name: 'Home', icon: 'home' },
    { id: 'sports', name: 'Sports', icon: 'sports-basketball' },
  ];

  // Filter and search products
  const getFilteredProducts = () => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch({
      type: 'cart/addItem',
      payload: { ...product, quantity: 1 }
    });
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  // View product details
  const handleViewProduct = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  // Render product item
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productImage}>
        <Text style={styles.productEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.productRating}>
            <Icon name="star" size={16} color="#ffc107" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.productActions}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => handleViewProduct(item)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Render category chip
  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item.id ? styles.categoryChipActive : null
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon name={item.icon} size={16} color={selectedCategory === item.id ? 'white' : '#e53e3e'} />
      <Text style={[
        styles.categoryChipText,
        selectedCategory === item.id ? styles.categoryChipTextActive : null
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredProductList = getFilteredProducts();

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Icon name="clear" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            // Show sort options (you can implement a picker/modal here)
            Alert.alert(
              'Sort Options',
              'Choose sorting option',
              [
                { text: 'Name', onPress: () => setSortBy('name') },
                { text: 'Price: Low to High', onPress: () => setSortBy('price-low') },
                { text: 'Price: High to Low', onPress: () => setSortBy('price-high') },
                { text: 'Rating', onPress: () => setSortBy('rating') },
                { text: 'Cancel', style: 'cancel' },
              ]
            );
          }}
        >
          <Text style={styles.sortButtonText}>
            {sortBy === 'name' ? 'Name' :
             sortBy === 'price-low' ? 'Price ↑' :
             sortBy === 'price-high' ? 'Price ↓' : 'Rating'}
          </Text>
          <Icon name="keyboard-arrow-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProductList}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="shopping-cart" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e53e3e',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: '#e53e3e',
  },
  categoryChipText: {
    color: '#e53e3e',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryChipTextActive: {
    color: 'white',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sortLabel: {
    fontSize: 14,
    color: '#666',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  productsList: {
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 12,
  },
  productEmoji: {
    fontSize: 48,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e53e3e',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e53e3e',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#e53e3e',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#e53e3e',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
});

export default ProductsScreen;