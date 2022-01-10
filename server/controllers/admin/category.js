import Category from "../../models/AdminModel/Category.js";

export const addCategory = (req, res) => {
  const newCategory = new Category({
    name: req.body.category,
  });
  newCategory
    .save()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

export const getCategories = (req, res) => {
  Category.find()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
