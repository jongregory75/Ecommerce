const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint
// get /api/tags/  --- getAll ---
router.get("/", (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get /api/tags/  --- getByPk ---
router.get("/:id", (req, res) => {
  try {
    const tagData = await Product.findByPk({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

// post /api/tags/  --- create ---
router.post("/", (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(tagData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(500).json(err);
  }
});

// put /api/tags/:id  --- update ---
router.put("/:id", (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete /api/tags/  --- destroy ---
router.delete("/:id", (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
