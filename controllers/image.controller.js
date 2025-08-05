/**
 * Upload media file (image, video, audio)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No media file uploaded' });
    }

    if (!req.file.path) {
      return res
        .status(500)
        .json({ error: 'Media upload to cloud storage failed' });
    }

    return res.json({
      location: req.file.path,
      mediaType: req.file.mimetype.split('/')[0], // 'image', 'video', or 'audio'
      fileSize: req.file.size,
    });
  } catch (error) {
    console.error('Media upload error:', error);
    return res.status(500).json({ error: 'Media upload failed' });
  }
}
