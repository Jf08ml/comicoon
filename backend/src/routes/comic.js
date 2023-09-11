import { Router } from "express";
const router = Router();
import {
  postComic,
  getUserComics,
  getUserComic,
  putComic,
  getAzarComics,
  postRateComic,
  assignScore,
  countViews,
} from "../controllers/comicController";
import verifyToken from "../middleware/auth";

router.post("/postcomic", verifyToken, postComic);
router.get("/usercomics", verifyToken, getUserComics);
router.get("/usercomic/:id", getUserComic);
router.put("/putcomic", verifyToken, putComic);
router.get("/azarcomics", getAzarComics);
router.post("/rateComic", verifyToken, postRateComic);
router.put("/assignScore", assignScore);
router.put("/sumView", countViews);

export default router;
