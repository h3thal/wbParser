import express from "express";
import itemsRouter from "./api/items/items.router.js";
import { errorHandler, notFound } from "./api/middleware/error.middleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/items", itemsRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Сервер запущен на пору: ${PORT}`);
});
