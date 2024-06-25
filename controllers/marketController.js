const Product = require("../models/Product");

const getAllPublishedProducts = async (req, res) => {
  const products = await Product.find({ published: true });

  //pagination - sorting
  const perPage = 5; //number of products per page
  const page = parseInt(req.query.page) || 1;

  const sortField = req.query.sortField || "createdAt";
  const sortOrder = req.query.sortOrder;
  const sortOrderData = sortOrder === "desc" ? -1 : 1;

  try {
    const totalProducts = await Product.countDocuments({ published: true });

    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await Product.find({ published: true })
      .sort({ [sortField]: sortOrderData })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.render("market", {
      products,
      currentPage: page,
      totalPages,
      sortField,
      sortOrder,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }

  //end of pagination - sorting
};

const addBuyer = async (req, res) => {
  const userId = req.user._id.toString();
  const productId = req.params.id;

  const currentDate = new Date();

  const newBuyer =
    req.user.name +
    "- " +
    currentDate.toDateString() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds() +
    "-" +
    req.user.email;

  const Buyers = req.body.buyers ? req.body.buyers : "";

  req.body.buyers = Buyers + newBuyer + "\n";

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    req.flash("error", `No product with id: ${productId}`);
  }

  res.redirect("/market");
};

module.exports = {
  getAllPublishedProducts,
  addBuyer,
};
