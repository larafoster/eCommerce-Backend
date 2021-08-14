const router = require ('express').Router ();
const {Category, Product} = require ('../../models');

// The `/api/categories` endpoint
/* router.get('/', (req, res) => {
  // Get all books from the book table
  Book.findAll().then((bookData) => {
    res.json(bookData);
  });
}); 
*/
router.get ('/', (req, res) => {
  // find all categories
  // Get all books from the book table
  Category.findAll ({
    include: [Product], // be sure to include its associated Products
  })
    .then (categories => res.status (200).json (categories))
    .catch (err => {
      console.log (err);
      res.status (500).json (err);
    });
});

router.get ('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne ({
    // JOIN with travellers, using the Trip through table
    //here instead of through use where and include
    where: {id: req.params.id},
    include: [Product],
  })
    .then (category => res.status (200).json (category))
    .catch (err => res.status (400).json (err));
});

router.post ('/', (req, res) => {
  // create a new category
  Category.create (req.body)
    .then (category => res.status (200).json (category))
    .catch (err => {
      console.log (err);
      res.status (400).json (err);
    });
});

router.put ('/:id', (req, res) => {
  try {
    Category.update (req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!CategoryData[0]) {
      res.status (404).json ({message: 'not found'});
      return;
    }
    res.status (200).json (CategoryData);
  } catch (err) {
    res.status (500).json (err);
  }
});

router.delete ('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy ({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status (404).json ({message: 'No Category found with this id!'});
      return;
    }

    res.status (200).json (categoryData);
  } catch (err) {
    res.status (500).json (err);
  }
});

module.exports = router;
