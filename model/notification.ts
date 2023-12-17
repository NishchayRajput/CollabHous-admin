import mongoose, { Document, Schema, Types } from 'mongoose';
import UserInfo  from './userinfo';
import  Blog  from './blogs';

interface Notification extends Document {
  parent_id: Types.ObjectId 
  user_id: Types.ObjectId 
  blog_id: Types.ObjectId 
  type: string;
  content?: string;
  status: string;
}

const notificationsSchema = new Schema<Notification>({
  parent_id: {
    type: Schema.Types.ObjectId,
    ref: 'userInfo', // Reference to the 'userInfo' model
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'userInfo',
    required: true,
  },
  blog_id: {
    type: Schema.Types.ObjectId,
    ref: 'blogs',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  status: {
    type: String,
    default: 'unread',
  },
});

// Create and export the 'notifications' model based on the schema
const NotificationModel = mongoose.model<Notification>('notifications', notificationsSchema, 'notifications');

export default NotificationModel;
