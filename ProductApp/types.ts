export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  thumbnail: string;
  reviews: Review[];
};

export type RootStackParamList = {
  Products: undefined;

  ProductDetails: {
    product: Product;
  };
};