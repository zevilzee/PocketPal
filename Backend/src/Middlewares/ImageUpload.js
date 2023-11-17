import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //args sequence is errors, destination
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    console.log("file type is ", file.mimetype);
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Image file type invalid"), false);
    }
  },
});
