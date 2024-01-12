import React, { useState } from "react";
import UserSideMenu from "../../../../components/userSideMenu";

// compoenents
import TradeList from "./TradeList";
import TradeDetails from "./TradeDetails";
export default function MyProfile() {
  const [showTrade, setShowTrade] = useState(false);

  // handle image change

  return (
    <UserSideMenu>
      {showTrade ? (
       <TradeDetails  setShowTrade={setShowTrade}/>
      ) : (
        <TradeList setShowTrade={setShowTrade} />
      )}
    </UserSideMenu>
  );
}
