import React, { useState } from "react";
import TradeRequestList from "./tradeRequestList";

import TradeRequest from "./tradeRequest";
import Navbar from "../Navbar";

export default function Profile({ setSidebar, sidebar }) {
  const [view, setView] = useState(null);
  const [singleTrade, setSingleTrade] = useState({
    productName: "productName",
    exchangeProduct: "productName",
    description: "it is a simple description",
    images: [1, 2, 3, 4, 5],
  });

  return (
    <>
      <Navbar
        setSidebar={setSidebar}
        sidebar={sidebar}
        title={
          view === "single-trader-request"
            ? "My Trading Product"
            : "Trade Request"
        }
      />
      {view === "single-trader-request" ? (
        <TradeRequest
          setView={setView}
          setSingleTrade={setSingleTrade}
          singleTrade={singleTrade}
        />
      ) : (
        <TradeRequestList setView={setView} />
      )}
    </>
  );
}
