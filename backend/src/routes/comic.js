import { Router } from "express";
const router = Router();
import {
  postComic,
  getUserComics,
  getUserComic,
  postRateComic,
  assignScoreComic,
  countViewsComic,
} from "../controllers/comicController";
import verifyToken from "../middleware/auth";

router.post("/postcomic", verifyToken, postComic);
router.get("/usercomics", verifyToken, getUserComics);
router.get("/usercomic/:id", getUserComic);
router.post("/rateComic", verifyToken, postRateComic);
router.put("/assignScore", assignScoreComic);
router.put("/sumView", countViewsComic);

export default router;
