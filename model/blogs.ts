import mongoose, { Document, Schema, Types } from "mongoose";
import moment from "moment-timezone";
import UserInfoModel from "./userinfo";
interface Blog extends Document {
    user_id: Types.ObjectId;
    title: string;
    content: string;
    // richTextContent: {
    //     s3Key: string;
    //     bucket: string;
    //     dateCreated: Date;
    //     region: string;
    //   } | null;
    richTextContent: string | null;
    tags?: string;
    like: number;
    time: Date;
    read_time?: number;
    items: {
        s3Key: string;
        bucket: string;
        mime: string;
        dateCreated: Date;
        region: string;
    }[];
}

const blogsSchema = new Schema<Blog>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "userInfo", // Reference to the 'userInfo' model
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
    // richTextContent: {
    //     type: {
    //         s3Key: { type: String },
    //         bucket: { type: String },
    //         dateCreated: { type: Date },
    //         region: { type: String },
    //     },
    //     default: null, // adjust the default value as needed
    // },
    richTextContent: {
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
        default: () => moment.tz("Asia/Kolkata").toDate(), // Set the default value to the current time in IST
    },
    read_time: {
        type: Number,
    },
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

// Create and export the 'blogs' model based on the schema
const BlogsModel = mongoose.model<Blog>("blogs", blogsSchema);

export default BlogsModel;
