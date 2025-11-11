// server/src/routes/live.js
import { Router } from "express";
import multer from "multer";

const upload = multer();
const router = Router();

const RAW_FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8001";
const FASTAPI_BASE = RAW_FASTAPI_URL.replace(/\/+$/, ""); // trim trailing slashes

router.post("/detect", upload.single("image"), async (req, res) => {
  try {
    const mode = (req.query.mode || "letters").toString();
    if (!req.file?.buffer) {
      return res.status(400).json({ error: "Image is required" });
    }
    const fd = new FormData();
    const contentType = req.file.mimetype || "image/jpeg";
    fd.append(
      "image",
      new Blob([req.file.buffer], { type: contentType }),
      "frame.jpg"
    );

    const resp = await fetch(
      `${FASTAPI_BASE}/detect?mode=${encodeURIComponent(mode)}`,
      {
        method: "POST",
        body: fd,
      }
    );

    const json = await resp.json();
    return res.status(resp.status).json(json);
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
});

export default router;
