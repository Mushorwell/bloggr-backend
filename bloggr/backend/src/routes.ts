import { Express, Request, Response } from "express";

import { createUserHandler, getUsersHandler } from "./controller/user.controller";
import {
    createUserSessionHandler,
    invalidateUserSessionHandler,
    getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
    createUserSchema,
    createUserSessionSchema,
} from "./schema/user.schema";
import {
    getBlogHandler,
    getBlogsHandler,
    createBlogHandler,
    updateBlogHandler,
    deleteBlogHandler,
} from "./controller/blog.controller";
import {
    deleteBlogSchema,
    createBlogSchema,
    updateBlogSchema,
} from "./schema/blog.schema";
import demo from "./Data/demo.data";

export default function (app: Express) {

    // test connection
    app.get("/test", (req: Request, res: Response) => res.sendStatus(200));

    // load demo data
    app.get('/api', demo);

    // get all users
    app.get("/api/users", getUsersHandler);
    // Register user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    // Login
    app.post(
        "/api/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    );

    // Get the user's sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler);

    // Logout
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

    // Create a post
    app.post(
        "/api/blogs",
        [requiresUser, validateRequest(createBlogSchema)],
        createBlogHandler
    );

    // Update a post
    app.put(
        "/api/blogs/:postId",
        [requiresUser, validateRequest(updateBlogSchema)],
        updateBlogHandler
    );

    // Get a post
    app.get("/api/blogs/", getBlogsHandler);
    app.get("/api/blogs/:postId", getBlogHandler);

    // Delete a post
    app.delete(
        "/api/blogs/:postId",
        [requiresUser, validateRequest(deleteBlogSchema)],
        deleteBlogHandler
    );
}