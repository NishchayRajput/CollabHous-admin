import mongoose, { Document, Schema } from 'mongoose';


interface AdminUser extends Document {
  username: string;
  password: string;
 
}

const adminUserSchema = new Schema<AdminUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AdminUserModel = mongoose.model<AdminUser>('AdminUser', adminUserSchema);

export default AdminUserModel;
