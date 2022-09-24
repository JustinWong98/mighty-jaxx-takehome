import express from "express";
import multer, { FileFilterCallback, MulterError } from "multer";

import { getProducts, addProduct } from "../controllers/productsController";
import { auth } from "../middleware/auth";

const router = express.Router();

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    // change first param to MulterError
    cb(null, false);
  }
};

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
});

router.get("/", auth, getProducts);
// to separate into own middleware func
router.post("/", auth, upload.single("image"), addProduct);
// router.patch("/:id", auth, editProduct);
// router.delete("/:id", auth, deletePost);

export default router;
