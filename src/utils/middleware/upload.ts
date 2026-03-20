import multer from "multer";
import fs from "fs";
import path from "path";

const uploadPath = path.resolve("public/uploads/avatars");

// 👇 cria a pasta se não existir
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

export const uploadAvatar = multer({ storage });