import express from "express";
import authController from "../controllers/auth.controller";
import authCtrl from "../controllers/auth.controller";
import userCtrl from "../controllers/user.controller";
import postCtrl from "../controllers/post.controller"
const router = express.Router();

router.param("userId",userCtrl.userByID)
router.param("postId",postCtrl.postByID)
router.route("/api/posts/feed/:userId").get(authCtrl.requireSignin, postCtrl.listNewsFeed)
router.route("/api/posts/new/:userId").post(authController.requireSignin,postCtrl.create)
router.route("/api/posts/photo/:postId").get(postCtrl.photo)
router.route("/api/posts/remove/:postId").delete(authCtrl.requireSignin,postCtrl.isPoster,postCtrl.remove)
router.route("/api/posts/like").put(authCtrl.requireSignin,postCtrl.like)
router.route("/api/posts/unlike").put(authCtrl.requireSignin,postCtrl.unlike)
router.route("/api/posts/comment").put(authCtrl.requireSignin,postCtrl.comment)
router.route("/api/posts/uncomment").put(authCtrl.requireSignin,postCtrl.uncomment)
export default router;