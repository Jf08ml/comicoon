import { Router } from "express";
const router = Router();
import {
  emailPayout,
  getUserPayments,
  getAllPaymentsUser,
  requestPayment,
} from "../controllers/payoutController";
import verifyToken from "../middleware/auth";

router.post("/payout", verifyToken, emailPayout);
router.get("/userpayments", verifyToken, getUserPayments);
router.get("/getallpaymentsuser", verifyToken, getAllPaymentsUser);
router.put("/requestpayment", verifyToken, requestPayment);

export default router;
