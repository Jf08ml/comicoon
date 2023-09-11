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
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "You are authorized to access this route." });
});

export default router;
