const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');

router.post('/', tagController.createTag);
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.put('/:id', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);
// update tag count after artwork is uploaded
router.patch('/updateTagCount/:id', tagController.updateTagCount);

module.exports = router;
