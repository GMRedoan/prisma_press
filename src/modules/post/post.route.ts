import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.USER, Role.ADMIN), postController.createPost)

router.get("/", postController.getAllPosts)

router.get("/stats", auth(Role.ADMIN), postController.getAllStats)

router.get("/my-posts", auth(Role.USER, Role.AUTHOR, Role.ADMIN), postController.getMyPosts)

router.get("/:postId", postController.getPostsById)

router.patch("/:postId", auth(Role.USER, Role.AUTHOR, Role.ADMIN), postController.updatePostsId)

router.delete("/:postId", auth(Role.USER, Role.AUTHOR, Role.ADMIN), postController.deletePostsId);

export const postRouter = router;