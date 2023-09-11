import { Router } from "express";
const router = Router();
import {
  postSerie,
  getUserSeries,
  getUserSerie,
  assignScoreSerie,
  countViewsSerie,
  getSeriesData,
  getArtistSeries,
  searchSerie,
  getSeriesToInscribe,
  enteredSeries,
} from "../controllers/serieController";
import verifyToken from "../middleware/auth";

router.get("/userseries", verifyToken, getUserSeries);
router.get("/userserie/:id", getUserSerie);
router.post("/postserie", verifyToken, postSerie);
router.put("/assignScoreSerie", assignScoreSerie);
router.put("/sumViewSerie", countViewsSerie);
router.get("/seriesData/:type/:queryType", getSeriesData)
router.get("/artistSeries/:artist", getArtistSeries);
router.get("/searchSeries/:nameSerie", searchSerie);
router.get("/seriestoinscribe", verifyToken, getSeriesToInscribe);
router.put("/enteredseries/:serie", verifyToken, enteredSeries);
export default router;
