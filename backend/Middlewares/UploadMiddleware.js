import multer from "multer";
import path from "path";

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Upload files to the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Create a unique filename with the original extension
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

// File filter (optional, check for allowed types if needed)
const fileFilter = (req, file, cb) => {
    // Accept all files for now, or you can restrict like below:
    // const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    // const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    // const mimetype = allowedTypes.test(file.mimetype);
    // if (extname && mimetype) {
    //     return cb(null, true);
    // } else {
    //     cb("Error: File type not supported!");
    // }
    cb(null, true); 
};

// Initialize multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
    fileFilter: fileFilter,
});

export default upload;
