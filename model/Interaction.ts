import mongoose, { Document, Schema, Types } from 'mongoose';
import moment from 'moment-timezone';
import  UserInfo  from './userinfo';
import  Blog  from './blogs';

interface Reply extends Document {
  user_id: Types.ObjectId ;
  reply_content: string;
  time: Date;
}

const replySchema = new Schema<Reply>({
  user_id: { type: Schema.Types.ObjectId, ref: 'userInfo', required: true },
  reply_content: { type: String, required: true },
  time: {
    type: Date,
    default: () => moment.tz('Asia/Kolkata').toDate(),
  },
});

interface Interaction extends Document {
  blog_id: Types.ObjectId;
  user_id: Types.ObjectId;
  interaction_id: string;
  interaction_type: string;
  interaction_content: string;
  time: Date;
  replies: Reply[];
}

const interactionSchema = new Schema<Interaction>({
  blog_id: { type: Schema.Types.ObjectId, ref: 'blogs' },
  user_id: { type: Schema.Types.ObjectId, ref: 'userInfo', required: true },
  interaction_id: { type: String, required: true },
  interaction_type: { type: String, required: true },
  interaction_content: { type: String },
  time: {
    type: Date,
    default: () => moment.tz('Asia/Kolkata').toDate(),
  },
  replies: [replySchema],
});

// Create and export the 'interaction' model based on the schema
const InteractionModel = mongoose.model<Interaction>('interaction', interactionSchema);

export default InteractionModel;
