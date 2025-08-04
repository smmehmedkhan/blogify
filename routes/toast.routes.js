import express from 'express';
const toastRouter = express.Router();

toastRouter.get('/toasts', (req, res) => {
  const toasts = [];
  ['success', 'error', 'warning', 'info'].forEach((type) => {
    const messages = req.flash(type);
    messages.forEach((message) => {
      toasts.push({ type, message });
    });
  });
  res.json(toasts);
});

export default toastRouter;
