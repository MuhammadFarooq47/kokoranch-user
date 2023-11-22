import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PUT, PATCH } from "../../../../apis/requests";
import Popup from "../../../../components/popUp/popUp";
import Images from "../../../../constants/images";
import { LOGOUT } from "../../../../redux/actions/authentication";

export default function PasswordChangeForm() {
  // { setFormChange}
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.authReducer);
  // console.log("token ????????????????", token)
  const [isLoading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const onsubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Password does not match");
    } else {
      try {
        const response = await PATCH(
          "/users/updateMyPassword",
          token,
          "",
          data
        );
        console.log("users/updateMyPassword", response?.message);
        if (response.success === false) {
          toast.error(response.message);
          setLoading(false);
        } else {
          toast.success(response.message);
          setLoading(false);
          setPopupOpen(true);
          // CLEARING VALUES
          setValue("passwordCurrent", "");
          setValue("password", "");
          setValue("passwordConfirm", "");
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  const logoutAndSwitch = (e) => {
    e.preventDefault();
    dispatch(LOGOUT(token, navigate));
  };

  return (
    <>
      <form
        className="row password-change-form"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="col-6">
          <div className="col-12">
            <label htmlFor="passwordCurrent" className="form-label">
              Current Password
            </label>
            <Controller
              name="passwordCurrent"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <input
                    className="form-control form-control-white"
                    type="password"
                    name={field.name}
                    value={field.value}
                    placeholder="Current Password"
                    onChange={field.onChange}
                    error={errors.password}
                    required
                  />
                );
              }}
            ></Controller>
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <input
                    className="form-control form-control-white"
                    type="password"
                    name={field.name}
                    value={field.value}
                    placeholder="New Password"
                    onChange={field.onChange}
                    error={errors.password}
                    required
                  />
                );
              }}
            ></Controller>
          </div>
          <div className="col-12">
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm Password
            </label>
            <Controller
              name="passwordConfirm"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => {
                return (
                  <input
                    type="password"
                    className="form-control form-control-white"
                    name={field.name}
                    value={field.value}
                    placeholder="Confirm Password"
                    onChange={field.onChange}
                    error={errors.passwordConfirm}
                    required
                  />
                );
              }}
            ></Controller>
          </div>
          <div className="row">
            <div className="col-6">
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-solid btn-solid-primary btn-full"
              >
                Update Password
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-outline-primary w-100 py-3"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6"></div>
      </form>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="success"
          />
          <p className="model-wrapper_text" style={{ fontSize: "1.5rem" }}>
            Password Updated Successfully, Login Again
          </p>
          <button
            onClick={(e) => {
              setPopupOpen(false);
              logoutAndSwitch(e);
              //  setFormChange(false)
            }}
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  );
}
