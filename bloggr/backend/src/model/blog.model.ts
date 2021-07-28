import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { IUserDocument as IUser } from "./user.model";

export interface IBlogDocument extends mongoose.Document {
    user: IUser["_id"];
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        title: { type: String, default: true },
        body: { type: String, default: true },
    },
    { timestamps: true }
);

const Blog = mongoose.model<IBlogDocument>("Post", BlogSchema);

export default Blog;