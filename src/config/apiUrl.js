import { toast } from "react-toastify";
import BlankUserImg from "../assets/images/blank-user-img.png";
// //
export const apiUrl = "https://kokoranch-backend-45665121adb2.herokuapp.com";
// export const apiUrl = "http://192.168.100.33:3030";
export const socketURL = apiUrl;
// export const imageUrl = (image) => `${apiUrl}/api/images/${image}`;
export const imageUrl = (image) => `https://kokoranch-development.s3.ap-south-1.amazonaws.com/${image}`;
export const pdfUrl = (pdf) => `${apiUrl}/api/pdf/${pdf}`;

export const BaseURL = (link) => {
  return `${apiUrl}/api/v1/${link}`;
};
export const BoolTester = (value) => {
  const Booler = value == "Yes" ? true : value == "No" ? false : undefined;

  return Booler;
};

export const apiHeader = (token, isFormData) => {
  if (token && !isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  }
  if (token && isFormData) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  }
  if (!token && !isFormData) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (!token && isFormData) {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }
};

export const recordsLimit = 10;

export const formRegEx = /([a-z])([A-Z])/g;
export const formRegExReplacer = "$1 $2";
export const numberRegEx = /[^0-9]+/g;

export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const fallbackUser = BlankUserImg;

export const falsyArray = [
  null,
  undefined,
  "",
  0,
  false,
  NaN,
  "null",
  "undefined",
  "false",
  "0",
  "NaN",
];

export const firebaseVapidObject = {
  vapidKey:
    "BLfSR8mqHIPpvWfE57Vs16en_D0yjlTUyM_Lb40_2OsVJJgIy2UFpJ7qlE7J6zhkY9Gqq788219TZc-dpIjxUHY",
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function dataURLtoFile(dataurl, filename = `${Math.random()}.jpeg`) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const capitalizeFirstLetter = (l = "test") =>
  l.charAt(0).toUpperCase() + l.slice(1);


  export const three300RegEx = /^([1-9]|[1-9][0-9]|[12][0-9]{2}|300)$/;