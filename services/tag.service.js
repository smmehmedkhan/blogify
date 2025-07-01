import Tag from '../models/tag.model.js';

class TagService {
  async getAllTags() {
    let tags = await Tag.find().sort({ name: 1 }).select('name -_id');
    return tags.map((tag) => tag.name);
  }

  /**
   * Ensure all tags exist in the Tag collection.
   * Accepts an array of tag names (strings).
   * Adds any new tags that don't already exist.
   */
  async addTagNames(tags) {
    if (!Array.isArray(tags)) return;

    // Normalize tags (trim, lowercase)
    const normalizedTags = tags.map((tag) => tag.trim().toLowerCase());

    // Find which tags already exist
    const existingTags = await Tag.find({
      name: { $in: normalizedTags },
    }).select('name');
    const existingTagNames = existingTags.map((tag) => tag.name);

    // Filter out tags that don't exist yet
    const newTags = normalizedTags.filter(
      (tag) => !existingTagNames.includes(tag),
    );

    // Insert new tags
    if (newTags.length > 0) {
      await Tag.insertMany(
        newTags.map((name) => ({ name })),
        { ordered: false },
      ).catch(() => {});
    }
  }
}

export default new TagService();
