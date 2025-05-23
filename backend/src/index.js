import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { app, server } from "./socket.io/socket.js";
import connectDatabase from "./db/databaseConnection.js";

const PORT = process.env.PORT;

app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.18.14:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>HELLO FORM</h1>")
})

import AuthRoutes from "./routes/auth.routes.js";
import UserRoutes from "./routes/user.routes.js";
import BookRoutes from "./routes/book.routes.js";
import MessageRoutes from "./routes/message.routes.js";

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/books", BookRoutes);
app.use("/api/v1/message", MessageRoutes);

connectDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`App is listening on : http://localhost:${PORT}`);
    })
});
