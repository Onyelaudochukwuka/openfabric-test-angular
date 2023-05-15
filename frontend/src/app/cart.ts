export interface Cart {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  rating?: number[];
  _id?: string;
  quantity?: number;
}
