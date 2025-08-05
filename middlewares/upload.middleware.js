import multer from 'multer';
import { storage } from '../utils/cloudinary.utils.js';

const SUPPORTED_MEDIA_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/ogg'],
  audio: ['audio/mp3', 'audio/wav', 'audio/ogg'],
};

const upload = multer({
  storage,
  limits: {
    fileSize: (req, file) => {
      if (file.mimetype.startsWith('image/')) return 10 * 1024 * 1024; // 10MB for images
      if (file.mimetype.startsWith('video/')) return 100 * 1024 * 1024; // 100MB for videos
      if (file.mimetype.startsWith('audio/')) return 50 * 1024 * 1024; // 50MB for audio
      return 5 * 1024 * 1024; // Default 5MB
    },
  },
  fileFilter: (_req, file, cb) => {
    const allSupportedTypes = Object.values(SUPPORTED_MEDIA_TYPES).flat();

    if (allSupportedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Unsupported file type. Only images, videos, and audio files are allowed!',
        ),
        false,
      );
    }
  },
});

export default upload;
