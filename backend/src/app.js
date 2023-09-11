import "./config/db.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth";
import payoutRoutes from "./routes/payout";
import seriesRoutes from "./routes/serie.js";
import comicRoutes from "./routes/comic";

const app = express();

// Configuración de middlewares
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "*"
        : "tuDominioEnProduccion.com",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/payout", payoutRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/comic", comicRoutes);

app.get("/", (req, res) => {
  res.send("API Comics");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);

  const statusCode = err.statusCode || 500;

  const message =
    process.env.NODE_ENV === "development" || err.statusCode
      ? err.message
      : "Server error";

  res.status(statusCode).json({ result: "error", message: message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
