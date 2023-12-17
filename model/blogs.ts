import mongoose, { Document, Schema, Types } from 'mongoose';
import moment from 'moment-timezone';
import UserInfoModel from './userinfo';

interface Blog extends Document {
    user_id: Types.ObjectId;
    title: string;
    content: string;
    tags?: string;
    like: number;
    time: Date;
    read_time?: number;
}

const blogsSchema = new Schema<Blog>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'userInfo', // Reference to the 'userInfo' model
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    like: {
        type: Number,
        default: 0, // Default value for 'like' field is 0
    },
    time: {
        type: Date,
        default: () => moment.tz('Asia/Kolkata').toDate(), // Set the default value to the current time in IST
    },
    read_time: {
        type: Number,
    },
});

// Create and export the 'blogs' model based on the schema
const BlogsModel = mongoose.model<Blog>('blogs', blogsSchema);

export default BlogsModel;
