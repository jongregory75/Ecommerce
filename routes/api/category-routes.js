const router = require("express").Router();
const { Category, Product } = require("../../models");

// The "/api/categories" endpoint
// get /api/categories/   --- findAll ---
router.get("/", (req, res) => {
  try {
    const categoryData = await Catagory.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get /api/categories/:id   --- findByPk ---
router.get("/:id", (req, res) => {
  try {
    const catagoryData = await Catagory.findByPk({
      include: [{ model: Product }],
    });
    res.status(200).json(catagoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// post /api/categories/ -- create --
router.post("/", (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(categoryData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(500).json(err);
  }
});

// put /api/categories/:id --- update ---
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete /api/categories/:id --- destroy ---
router.delete("/:id", (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
