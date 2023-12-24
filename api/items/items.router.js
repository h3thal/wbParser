import exporess from "express";
import { getItems } from "./items.controller";

const router = exporess.Router();

router.route("/getItems").get(getItems);

export default router;
