import React, { useEffect, useState } from "react";
import Images from "../../../../constants/images";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER } from "../../../../redux/actions/authentication";
import Popup from "../../../../components/popUp/popUp";

export default function AddressForm({ setFormChange, setPopupOpen }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user, token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue("_id", user?._id);
    setValue("address", user?.address);
    setValue("city", user?.city);
    setValue("state", user?.state);
    setValue("country", user?.country);
    setValue("zipCode", user?.zipCode);
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const onsubmit = (data) => {
    setLoading(true);
    dispatch(UPDATE_USER(data, token, setLoading, setShow));
  };
  return (
    <>
      <form
        id="info-form"
        className="row info-change-form"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <input
                  className="form-control form-control-white"
                  name={field.name}
                  value={field.value}
                  placeholder="7033 Hand Crescent Suite 382"
                  onChange={field.onChange}
                  error={errors.address}
                />
              );
            }}
          ></Controller>
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <input
                  type={"text"}
                  className="form-control form-control-white"
                  name={field.name}
                  value={field.value}
                  placeholder="Dellas"
                  onChange={field.onChange}
                  error={errors.city}
                />
              );
            }}
          ></Controller>
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <input
                  className="form-control form-control-white"
                  name={field.name}
                  value={field.value}
                  placeholder="Texas"
                  onChange={field.onChange}
                  error={errors.state}
                />
              );
            }}
          ></Controller>
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="country" className="form-label">
            Conutry
          </label>
          <Controller
            name="country"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <input
                  className="form-control form-control-white"
                  name={field.name}
                  value={field.value}
                  placeholder="USA"
                  onChange={field.onChange}
                  error={errors.country}
                />
              );
            }}
          ></Controller>
        </div>
        <div className="col-md-6 col-sm-12 mt-4">
          <label htmlFor="zipCode" className="form-label">
            Zip Code
          </label>
          <Controller
            name="zipCode"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => {
              return (
                <input
                  className="form-control form-control-white"
                  type={"number"}
                  name={field.name}
                  value={field.value}
                  maxLength={4}
                  placeholder="54846"
                  onChange={field.onChange}
                  error={errors.zipCode}
                />
              );
            }}
          ></Controller>
        </div>
        <div className="info-change-form_button-wrapper">
          <button
            className="btn btn-solid-light"
            onClick={() => setFormChange(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-solid btn-solid-primary"
            form="info-form"
            disabled={isLoading}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>

      {/* POPUP  */}
      <Popup open={show} setOpen={setShow}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="success"
          />
          <p className="model-wrapper_text">Address Updated Successfully</p>
          <button
            onClick={() => {
              setShow(false);
              setFormChange(false);
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
