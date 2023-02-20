import express from "express"
import { get, post, Delete, update } from "../controllers/api.js";

const router = express.Router();


router.get("/get", get )
router.post("/post", post )
router.delete("/delete/:id", Delete )
router.put("/put/:id", update )


export default router;