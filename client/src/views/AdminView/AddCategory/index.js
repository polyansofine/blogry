import { Button, Container } from "@material-ui/core";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as categoryActions from "../store/actions";

export default function AddCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(({ admin }) => admin.category.category);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);
  const handleSubmit = () => {
    console.log("category=======", category);
    dispatch(categoryActions.addcategory(category));
  };
  const handleChange = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div>
      <Container style={{ margin: "100px" }}>
        <TextField
          value={category}
          variant="outlined"
          onChange={handleChange}
        ></TextField>
        <Button onClick={handleSubmit}> Add</Button>
        <br />
        {categories &&
          categories.map((item, index) => <p key={index}>{item.name}</p>)}
      </Container>
    </div>
  );
}
