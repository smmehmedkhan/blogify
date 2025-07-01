import Tag from '../models/tag.model.js';
import tagService from '../services/tag.service.js';

// Get all tags
export async function getAllTags(_req, res) {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
}

//
export async function addTags(req, res) {
  const tags = req.body.tags;
  try {
    await tagService.addTagNames(tags);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add tags' });
  }
}
