const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
/* router.get('/', (req, res) => {
  // Get all books from the book table
  Book.findAll().then((bookData) => {
    res.json(bookData);
  });
}); 
*/
router.get('/', (req, res) => {
  // find all categories
  // Get all books from the book table
  Category.findAll({
include: [Product],  // be sure to include its associated Products
  })
  .then((categories) => {
    res.json(categories);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
    try {
    const CategoryData = await Category.create(req.body);
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', (req, res) => {
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData[0]) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
    try {
    const CategoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!CategoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
