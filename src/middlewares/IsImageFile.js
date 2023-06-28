function isImageFile(req, res, next) {
    if (req.file && req.file.mimetype.startsWith('image/')) {
      next();
    } else {
      next('route');
    }
};

module.exports = isImageFile