const router = require ('express').Router ();
const {Tag, Product, ProductTag} = require ('../../models');

// The `/api/tags` endpoint

router.get ('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll ({
    include: [Product], // be sure to include its associated Products
  })
    .then (tags => res.status (200).json (tags))
    .catch (err => {
      console.log (err);
      res.status (500).json (err);
    });
});

router.get ('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne ({
    // JOIN with travellers, using the Trip through table
    //here instead of through use where and include
    where: {id: req.params.id},
    include: [Product],
  })
    .then (tags => res.status (200).json (tags))
    .catch (err => res.status (400).json (err));
});

router.post ('/', (req, res) => {
  // create a new tag
  Tag.create (req.body)
    .then (tags => res.status (200).json (tags))
    .catch (err => {
      console.log (err);
      res.status (400).json (err);
    });
});

router.put ('/:id', (req, res) => {
  try {
    Tag.update (req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tags[0]) {
      res.status (404).json ({message: 'not found'});
      return;
    }
    res.status (200).json (tags);
  } catch (err) {
    res.status (500).json (err);
  }
});

router.delete ('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Tag.destroy ({
      where: {
        id: req.params.id,
      },
    });

    if (!tags) {
      res.status (404).json ({message: 'No Category found with this id!'});
      return;
    }

    res.status (200).json (tags);
  } catch (err) {
    res.status (500).json (err);
  }
});

module.exports = router;