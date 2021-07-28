import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Blog , { IBlogDocument as IBlog } from "../model/blog.model";

export function createBlog(input: DocumentDefinition<IBlog>) {
    return Blog.create(input);
}

export function getBlogs() {
    return Blog.find().lean();
}

export function findBlog(
    query: FilterQuery<IBlog>,
    options: QueryOptions = { lean: true }
) {
    return Blog.findOne(query, {}, options);
}

export function findAndUpdate(
    query: FilterQuery<IBlog>,
    update: UpdateQuery<IBlog>,
    options: QueryOptions
) {
    return Blog.findOneAndUpdate(query, update, options);
}

export function deleteBlog(query: FilterQuery<IBlog>) {
    return Blog.deleteOne(query);
}