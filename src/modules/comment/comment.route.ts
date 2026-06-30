import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/author/:authorId", commentController.getCommentsByAuthorId);

router.get("/:commentId", commentController.getCommentsByCommentId);

router.post("/", auth(Role.USER, Role.ADMIN), commentController.createComment);
 
router.patch("/:commentId", auth(Role.USER, Role.ADMIN), commentController.updateComment)

router.delete("/:commentId", auth(Role.USER, Role.ADMIN), commentController.deleteComment);

router.patch("/:commentId/moderate", auth(Role.ADMIN, Role.USER), commentController.moderateComment);

export const commentsRouter = router