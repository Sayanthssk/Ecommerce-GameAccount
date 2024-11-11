import multer from 'multer';
import path from 'path';

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'profilePhoto') {
            cb(null, 'uploads/profilePhotos'); // Directory for profile photos
        } else if (file.fieldname === 'screenshots') {
            cb(null, 'uploads/screenshots'); // Directory for screenshots
        } else {
            cb(new Error('Invalid file field'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to prevent name collisions
    }
});

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!'); // Only accept image files
    }
};

// Initialize Multer with the storage engine and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 200 }, // Limit file size to 2MB
});

export default upload;
