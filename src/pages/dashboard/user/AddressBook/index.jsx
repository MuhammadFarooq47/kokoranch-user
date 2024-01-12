import React, { useState } from "react";
import UserSideMenu from "../../../../components/userSideMenu";

// components
import AddressForm from "./AddressForm"
import AddressDetails from "./AddressDetails";
export default function MyProfile() {
  const [formChange, setFormChange] = useState(false);
  return (
    <UserSideMenu>
      <div className="my-profile-wrapper">
        <h2 className="fs-2 mb-5">Address Book</h2>
        <div className="row my-profile-wrapper_inner-wrapper">
          {formChange ? (
            <AddressForm setFormChange={setFormChange} />
          ) : (
           <AddressDetails setFormChange={setFormChange}/>
          )}
        </div>
      </div>
    </UserSideMenu>
  );
}
