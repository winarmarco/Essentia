import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    filename: function(req, file, callbackFn) {
      callbackFn(null, file.fieldname + '-' + Date.now());
    }
  }),
  fileFilter: (req: Request, file: Express.Multer.File, callbackFn: FileFilterCallback) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      callbackFn(new Error("Unsupported file type!"));
      return;
    }
    callbackFn(null, true);
  },
});

export default upload;
