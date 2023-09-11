import User from "../models/users.js";
import Payout from "../models/payout.js";

async function emailPayout(req, res) {
  const { balance, emailPaypal } = req.body.payoutData || {};

  const existingEmailPaypal = await Payout.findOne({ emailPaypal });

  if (existingEmailPaypal) {
    return res
      .status(400)
      .json({ result: "errorEmail", message: "Email already exists" });
  }

  const userId = req.userId;
  const payout = new Payout({
    user: userId,
    balance,
    emailPaypal,
  });

  await payout.save();
  res.status(200).json({ result: "success", message: "Payment method saved" });
}

async function getUserPayments(req, res) {
  const userId = req.userId;
  const userData = await Payout.find({ user: userId });
  res.status(200).json({ userData });
}

async function requestPayment(req, res) {
  const { dataRequestPayment } = req.body || {};
  const userId = req.userId;

  const payout = await Payout.findOne({ user: userId });

  if (payout.balance <= 0) {
    return res
      .status(401)
      .json({ result: "errorBalance", message: "No balance available" });
  }

  const remaining = payout.balance - dataRequestPayment.amount;
  payout.balance = remaining;
  payout.payouts.push(dataRequestPayment);

  await payout.save();
  res.status(200).json({
    result: "success",
    message: "Payment request made",
    remaining: remaining,
  });
}

async function getAllPaymentsUser(req, res) {
  const userId = req.userId;
  const userData = await Payout.findOne({ user: userId });

  res.status(200).json(userData.payouts);
}

export { emailPayout, getUserPayments, getAllPaymentsUser, requestPayment };
