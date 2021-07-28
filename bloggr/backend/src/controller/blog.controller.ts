import { Request, Response } from "express";
import { get } from "lodash";
import {
    createBlog,
    deleteBlog,
    findAndUpdate,
    findBlog,
    getBlogs
} from "../service/blog.service";

export async function getBlogsHandler(req: Request, res: Response) {

    const blogs = await getBlogs();

    return res.send(blogs);
}

export async function createBlogHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const body = req.body;

    const post = await createBlog({ ...body, user: userId });

    return res.send(post);
}

export async function updateBlogHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const postId = get(req, "params.postId");
    const update = req.body;

    const post = await findBlog({ postId });

    if (!post) {
        return res.sendStatus(404);
    }

    if (String(post.user) !== userId) {
        return res.sendStatus(401);
    }

    const updatedPost = await findAndUpdate({ postId }, update, { new: true });

    return res.send(updatedPost);
}
export async function getBlogHandler(req: Request, res: Response) {
    const postId = get(req, "params.postId");
    const post = await findBlog({ postId });

    if (!post) {
        return res.sendStatus(404);
    }

    return res.send(post);
}

export async function deleteBlogHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const postId = get(req, "params.postId");

    const post = await findBlog({ postId });

    if (!post) {
        return res.sendStatus(404);
    }

    if (String(post.user) !== String(userId)) {
        return res.sendStatus(401);
    }

    await deleteBlog({ postId });

    return res.sendStatus(200);
}