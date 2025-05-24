import Photo from "../model/Photo.js";
import multer from "multer";

export const upload = multer({ dest: "uploads/" });

export const uploadDailyPhoto = async (req, res) => {
  try {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    const photo = await Photo.create({
      user: req.userId,
      url: `/uploads/${req.file.filename}`,
    });
    res.json({ success: true, photo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
