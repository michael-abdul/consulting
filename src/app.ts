import express from "express";
import path from "path";
import router from "./router";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/config";
import cookieParser from "cookie-parser";
import cors from "cors";

// 1-ENTRANCE

const app = express();
// console.log("__dirname",__dirname)
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));
app.use(cors({credentials: true, origin: true}))
// 3-VIEWS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 4-ROUTERS
app.use("/", router); // REACT ucun    middleware Design Pattern  SPA:REACT res API ucun qullayapmiz

export default app; //modele experts = app;
