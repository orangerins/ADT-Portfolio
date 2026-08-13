import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type Props = {
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
};

export default function ProductDetailsScreen({ route }: Props) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.productImage}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {product.title}
        </Text>

        <Text style={styles.category}>
          Category: {product.category}
        </Text>

        <Text style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>

        <Text style={styles.rating}>
          ⭐ {product.rating}
        </Text>

        <Text style={styles.descriptionTitle}>
          Description
        </Text>

        <Text style={styles.description}>
          {product.description}
        </Text>

        <Text style={styles.reviewsTitle}>
          Reviews
        </Text>

        {product.reviews.map((review, index) => (
          <View
            key={index}
            style={styles.reviewCard}
          >
            <Text style={styles.reviewRating}>
              ⭐ {review.rating}/5
            </Text>

            <Text style={styles.reviewerName}>
              {review.reviewerName}
            </Text>

            <Text style={styles.reviewComment}>
              {review.comment}
            </Text>

            <Text style={styles.reviewDate}>
              {new Date(review.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 10,
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  category: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },

  price: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  rating: {
    fontSize: 18,
    marginBottom: 20,
  },

  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555555',
    marginBottom: 25,
  },

  reviewsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  reviewRating: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  reviewComment: {
    fontSize: 15,
    color: '#444444',
    marginBottom: 8,
  },

  reviewDate: {
    fontSize: 12,
    color: '#777777',
  },
});