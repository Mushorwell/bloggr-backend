import { object, string } from "yup";

const payload = {
    body: object({
        title: string().required("Title is required"),
        body: string()
            .required("Body is required")
            .min(120, "Body is too short - should be 120 chars minimum."),
    }),
};

const params = {
    params: object({
        postId: string().required("postId is required"),
    }),
};

export const createBlogSchema = object({
    ...payload,
});

export const updateBlogSchema = object({
    ...params,
    ...payload,
});

export const deleteBlogSchema = object({
    ...params,
});