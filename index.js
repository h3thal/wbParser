import express from "express";
import itemsRouter from "./api/items/items.router.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", itemsRouter);

app.listen(PORT, () => {
	console.log(`Сервер запущен на пору: ${PORT}`);
});
