import mongoose, { Document, Schema } from 'mongoose';

interface UserInfo extends Document {
  name: string;
  g_id?: string; // Google ID for Google signups
  email: string;
  password?: string; // For normal signups
  address: string;
  isGoogleSignup: boolean; // Flag to indicate Google signup
}

const userInfoSchema = new Schema<UserInfo>({
  name: { type: String, required: true },
  g_id: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  address: { type: String, default: 'null' },
  isGoogleSignup: { type: Boolean, default: false },
});

const UserInfoModel = mongoose.model<UserInfo>('userInfo', userInfoSchema);

export default UserInfoModel;
