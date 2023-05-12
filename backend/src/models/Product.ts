import { Schema, models, model } from 'mongoose';

// **** Types **** //
export interface IProducts {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  rating?: number[];
  _id: string;
}

// **** Schema **** //
const productSchema = new Schema<IProducts>({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: [Number],
    required: false,
    default: [],
  },
});

// **** Export default **** //
export default models.Products || model('Products', productSchema);
