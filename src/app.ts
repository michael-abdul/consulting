import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import router from "./router"; // Ensure your router is exported correctly
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cookieParser from "cookie-parser";
import cors from "cors";

// Initialize Express app
const app: Application = express();

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.resolve("./uploads")));

// Parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// HTTP request logging
app.use(morgan(MORGAN_FORMAT));

// CORS Configuration
const allowedOrigins = ["http://localhost:3000", "https://studify.uz"]; // Allowed frontend origins
app.use(
  cors({
    credentials: true, // Allow cookies
    origin: (origin, callback) => {
      // Allow requests from allowed origins or tools like Postman (undefined origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
  })
);

// View engine configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes
app.use("/", router); // Route handler

// Global error handler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

// Export the app
export default app;
