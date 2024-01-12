import * as React from "react";
import Box from "@mui/material/Box";

import OutlinedInput from "@mui/material/OutlinedInput";

import InputAdornment from "@mui/material/InputAdornment";
import {BiSearchAlt} from "react-icons/bi"
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";

const SearchBar = ({
  inputType = "text",
  label = "Label",
  isSelectInput,
  selectId = "default",
  selectName = "defaultname",
  options = ["option1", "option2", "option3"],
  noLabel,
  placeHolder = "",
  icon,
  showPasswordIcon = false,
  value,
  setValue,
  disabled = false,
}) => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        // display: "flex",
        // flexWrap: "wrap",
        marginBottom: "10px",
        marginRight: "10px",
      }}
    >
      <div>
        <FormControl
          sx={{ width: "100%", height: "10px", color: "white" }}
          variant="outlined"
        >
          <OutlinedInput
            sx={{
              height: "40px",
              borderRadius: "20px",
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
            id="outlined-adornment-weight"
            value={values.weight}
            placeholder={"You can search orders by user id  and Order No"}
            onChange={handleChange("weight")}
            endAdornment={
              <div
                className="vender-searchbar-icon-hover"
                style={{ marginRight: "-10px" }}
              >
                <BiSearchAlt
                  position="end"
                  fontSize="large"
                  sx={{
                    borderRadius: "20px",
                    width: "30px",
                    height: "30px",
                  }}
                  className="vender-searchbar-icon-hover"
                  onClick={() => {
                    console.log("first");
                  }}
                />
              </div>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
      </div>
    </Box>
  );
};
export default SearchBar;
