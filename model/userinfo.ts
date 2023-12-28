import mongoose, { Document, Schema } from 'mongoose';

interface UserInfo extends Document {
  name: string;
  g_id?: string; // Google ID for Google signups
  email: string;
  password?: string; // For normal signups
  address: string;
  isGoogleSignup: boolean; // Flag to indicate Google signup
  items: {
    s3Key: string;
    bucket: string;
    mime: string;
    dateCreated: Date;
    region: string;
}[];
}

const userInfoSchema = new Schema<UserInfo>({
  name: { type: String, required: true },
  g_id: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  address: { type: String, default: 'null' },
  isGoogleSignup: { type: Boolean, default: false },
  items: [
    new Schema(
        {
            s3Key: { type: "String", required: true },
            bucket: { type: "String" },
            mime: { type: "String" },
            region: { type: "String" },
            dateCreated: { type: "Date", default: Date.now },
        },
        { _id: false }
    ),
],
});

const UserInfoModel = mongoose.model<UserInfo>('userInfo', userInfoSchema);

export default UserInfoModel;
