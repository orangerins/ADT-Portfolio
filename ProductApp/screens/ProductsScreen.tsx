import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Products'>;

export default function ProductsScreen({ navigation }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        'https://dummyjson.com/products'
      );

      const data = await response.json();

      const firstFiveProducts = data.products
        .slice(0, 5)
        .map((product: Product) => ({
          id: product.id,
          title: product.title,
          description: product.description,
          category: product.category,
          price: product.price,
          rating: product.rating,
          thumbnail: product.thumbnail,
          reviews: product.reviews,
        }));

      setProducts(firstFiveProducts);
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProduct = ({ item }: { item: Product }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
        />

        <Text style={styles.productTitle}>
          {item.title}
        </Text>

        <Text style={styles.category}>
          Category: {item.category}
        </Text>

        <Text style={styles.price}>
          ${item.price.toFixed(2)}
        </Text>

        <Text style={styles.rating}>
          ⭐ {item.rating}
        </Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('ProductDetails', {
              product: item,
            })
          }
        >
          <Text style={styles.buttonText}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading products...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Products
      </Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  category: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  rating: {
    fontSize: 16,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 12,
    lineHeight: 20,
  },

  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});