import { Schema, model, models } from 'mongoose';

// **** Types **** //
export interface IUser {
  name: string;
  email: string;
  hashedPassword: string;
  history?: string[];
  cart?: { id: string; quantity: number }[];
  savedItems?: string[];
  // true if user email has verified email
  emailVerified?: boolean;
  _id?: string;
}

// **** Schema **** //
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  history: {
    type: [String],
    required: false,
    default: [],
    ref: 'Products',
  },
  cart: {
    type: [{
      id: String,
      quantity: Number,
    }],
    required: false,
    default: [],
  },
  savedItems: {
    type: [String],
    required: false,
    default: [],
  },
  emailVerified: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// **** Export default **** //
export default models.User || model('User', userSchema);