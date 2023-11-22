import axios from "axios";
import { BASE_URL } from "./constant";

// GLOBAL POST REQUEST WITH AUTHRIZATION
const POST = async (path, token, data) => {
  // SETTING UP HEADER
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  // GETTING RESPONSE
  let res = await axios.post(BASE_URL + path, data, HEADER);
  return res.data;
};

// GLOBAL GET REQUEST WITH AUTHORIZATION
const GET = async (path, token, params) => {
  // SETTING UP HEADER & PARAMS
  const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    ;
  // GETTING RESPONSE
  let res = await axios.get(BASE_URL + path, {
    headers,
    params, // Add the parameters here
  });
  return res.data;
};


// GLOBAL PUT REQUEST WITH AUTHRIZATION
const PUT = async (path, token, params, data) => {
  // SETTING UP HEADER & PARAMS
  const HEADER = {
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-Type": "application/json",
        },
  };
  // GETTING RESPONSE
  let res = await axios.put(BASE_URL + path + "/" + params, data, HEADER);
  return res.data;
};

// GLOBAL PUT REQUEST WITH AUTHRIZATION
const PATCH = async (path, token, params, data) => {
  // SETTING UP HEADER & PARAMS
  const HEADER = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  // GETTING RESPONSE
  let res = await axios.patch(BASE_URL + path + "/" + params, data, HEADER);
  return res.data;
};

// GLOBAL DELETE REQUEST WITH AUTHRIZATION
const DELETE = async (path, token, params) => {
  // SETTING UP HEADER & PARAMS
  const HEADER = {
    headers: token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          params: params,
        }
      : {
          "Content-Type": "application/json",
          params: params,
        },
  };
  // GETTING RESPONSE
  let res = await axios.delete(BASE_URL + path, HEADER);
  return res.data;
};

export { POST, GET, PUT, PATCH, DELETE };
