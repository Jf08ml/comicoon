import { Router } from "express";
const router = Router();
import {
  signup,
  login,
  refreshTokens,
  getUser,
  searchNickname,
  updateUser,
  updateProfilePhoto,
  updatePassword,
  userRole,
} from "../controllers/userController";
import verifyToken from "../middleware/auth";

router.post("/signup", signup);
router.post("/login", login);
router.post("/refreshtokens", refreshTokens);
router.get("/getuser", verifyToken, getUser);
router.get("/searchnickname/:nickname", searchNickname);
router.put("/updateuser", verifyToken, updateUser);
router.put("/updateprofilephoto", verifyToken, updateProfilePhoto);
router.put("/updatepassword", verifyToken, updatePassword);
router.get("/userrole", verifyToken, userRole);

export default router;
