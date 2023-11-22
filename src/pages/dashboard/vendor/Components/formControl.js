import React, { useState, useEffect } from "react";
import { green, grey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_All_CATEGORIES } from "../../../../redux/actions/categories";

const FormControlAuth = ({
  inputType = "text",
  label = "Label",
  isSelectInput,
  selectId = "default",
  selectName = "defaultname",
  category = "select category",
  subCategory = "select sub category",
  subSubCategory = "select sub sub category",
  isSubCategory,
  isSubSubCategory,
  setCategory,
  setSubCategory,
  setSubSubCategory,
  options = ["option1", "option2", "option3"],
  noLabel,
  placeHolder = "",
  icon,
  showPasswordIcon = false,
  value,
  setValue,
  disabled = false,
  editService,
  isSelected,
  selectedCategory,
}) => {
  const [inputTypeState, setInputTypeState] = useState(inputType);
  const showPasswordText = () => {
    setInputTypeState(inputTypeState === "password" ? "text" : "password");
  };
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    isSubCategory
      ? setSubCategory(event.target.value)
      : isSubSubCategory
      ? setSubSubCategory(event.target.value)
      : setCategory(event.target.value);
  };

  useEffect(() => {
    if (isSelected) {
      setAge(selectedCategory);
      setCategory(selectedCategory);
    }
  }, []);

  const { categoriesProducts, categories, allCategories } = useSelector(
    (state) => state.CategoriesReducers
  );
  
  // console.log(allCategories);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(GET_All_CATEGORIES());
  // }, []);

  if (!isSelectInput) {
    return (
      <FormControl
        sx={{ marginTop: 2, marginBottom: 5, marginRight: 2, width: "20%" }}
        size={"small"}
      >
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{
            color: "rgba(228, 219, 233, 0.25)",
            "&.Mui-focused": {
              color: "rgba(228, 219, 233, 0.25)",
            },
          }}
        >
          {isSubCategory
            ? subCategory
            : isSubSubCategory
            ? subSubCategory
            : category}
        </InputLabel>
        <Select
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="select category"
          onChange={handleChange}
        >
          {allCategories?.map((item, index) => {
            return (
              <MenuItem
                key={editService ? item._id : item}
                value={editService ? item._id : item}
              >
                {item.categoryName}
              </MenuItem>
            );
          })}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    );
  }
  return (
    <div className="fga-form-group">
      <p className="fga-form-label">{label}</p>
      {/* <input type={inputType} className="fga-form-input" /> */}
      <select
        id={selectId}
        name={selectName}
        className="fga-form-input"
        disabled={disabled}
      >
        {/* <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option> */}
        {allCategories.map((op, index) => (
          <option value={op.subCategories} key={`${op}-${index}`}>
            {`${op.slice(0, 1).toUpperCase()}${op.slice(1)}`}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FormControlAuth;
