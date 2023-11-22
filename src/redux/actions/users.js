import { POST, GET, DELETE, PUT } from "../../apis/requests";
import ActionTypes from "../constant";
import { toast } from "react-toastify";

export default {
  UPDATE_USER_INFO_ACTION: (data, token, userId) => {
    return (dispatch) => {
      const formData = new FormData();

      for (const element of data.image) {
        if (typeof element === "object") {
          formData.append("image", element);
        } else if (typeof element === "string") {
          // formData.append('images', element)
        }
      }

      formData.append("firstName", data.firstName);
      formData.append("lastName ", data.lastName);
      formData.append("email", data.email);
      formData.append("contact", data.contact);

      return PUT(`/users/update/${userId}`, token, formData)
        .then((response) => {
          if (response.success === false) {
            toast.error(response.message);
          } else {
            toast.success(response.message);
            dispatch({
              type: ActionTypes.UPDATE,
              payload: response,
            });
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error.message);
        });
    };
  },
};
