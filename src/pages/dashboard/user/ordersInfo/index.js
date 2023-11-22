import React, { useState } from "react";
import UserSideMenu from "../../../../components/userSideMenu";

// components
import OrdersLists from "./OrdersLists";
import OrderDetails from "./OrderDetails";

export default function MyProfile() {
  const [showOrder, setShowOrder] = useState(false);
  const [type, setType] = useState("service");

  return (
    <UserSideMenu>
      {showOrder ? (
        <OrderDetails setShowOrder={setShowOrder} type={type} />
      ) : (
        <OrdersLists setShowOrder={setShowOrder} setType={setType} />
      )}
    </UserSideMenu>
  );
}
