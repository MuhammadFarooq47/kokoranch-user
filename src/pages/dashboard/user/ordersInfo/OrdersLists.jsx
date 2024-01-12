import React, { useEffect, useState } from "react";
import { TabContainer, Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import {GET_USER_CHECKOUT_DATA} from "../../../../redux/actions/checkout"


export default function OrdersLists({ setShowOrder, setType }) {

  const { checkout } = useSelector((state) => state.CheckoutReducer);


  const [stateCheckout, setStateCheckout] = useState([checkout]);

  const dispatch = useDispatch();

  useEffect(() => {
dispatch(GET_USER_CHECKOUT_DATA())
  }, [])
  
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    switch (activeTab) {
      case "all":
        setData(order);
        break;
      case "products":
        setData(
          order.filter(
            (item) => item.type.toLowerCase() === "product".toLowerCase()
          )
        );
        break;
      case "services":
        setData(order.filter((item) => item.type.toLowerCase() === "service"));
        break;
      default:
        setData(order);
    }
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const [data, setData] = useState([]);
  const [order] = useState([]);

  return (
    <TabContainer id="left-tabs-example" defaultActiveKey="first">
      <div className="row orderInfo">
        <div className="col-sm-12 col-md-6 col-lg-6 ">
          <h2 className="fs-2 mb-5">Orders Information</h2>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 ">
          <Nav variant="pills" className="tabs-head" style={{ float: "right" }}>
            <NavItem>
              <NavLink eventKey="first" onClick={() => setActiveTab("all")}>
                ALL
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                eventKey="second"
                onClick={() => setActiveTab("products")}
              >
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                eventKey="Third"
                onClick={() => setActiveTab("services")}
              >
                Services
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="col-12">
          <div className="table-content table-container">
            <table className="table table-container__table table-container__table--break-md">
              <thead>
                <tr>
                  <th
                    className="li-product-remove"
                    style={{ textAlign: "center" }}
                  >
                    Order No.
                  </th>
                  <th
                    className="li-product-thumbnail"
                    style={{ textAlign: "center" }}
                  >
                    Date
                  </th>
                  <th
                    className="cart-product-name"
                    style={{ textAlign: "center" }}
                  >
                    Product Name
                  </th>
                  <th
                    className="cart-product-name"
                    style={{ textAlign: "center" }}
                  >
                    Products Qty 
                  </th>
                  <th
                    className="li-product-price"
                    style={{ textAlign: "center" }}
                  >
                    Amount Paid
                  </th>
                  <th
                    className="li-product-quantity"
                    style={{ textAlign: "center" }}
                  >
                    Status
                  </th>
                  <th
                    className="li-product-subtotal"
                    style={{ textAlign: "center" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {checkout.map((order, index) => {
                  return (
                    <tr Key={index}>
                      <td
                        data-heading="Order No."
                        style={{ textAlign: "center" }}
                      >
                        {order.orderNumber}
                      </td>
                      <td data-heading="Date" style={{ textAlign: "center" }}>
                        {moment(order.createdAt).format("MMMM Do YYYY")}
                      </td>
                      <td
                      data-heading="Category"
                      style={{ textAlign: "center" }}
                    >
                {order?.items[0]?.productId?.productName || ''}
                    </td>
                      <td
                      data-heading="Products Qty"
                      style={{ textAlign: "center" }}
                    >
                {order?.items?.length}
                    </td>
                    {/* {  order?.items?.map((orderItems) => {
                    return(
                      <>
                      <td
                      data-heading="Category"
                      style={{ textAlign: "center" }}
                    >
                      {order?.items?.length}
                    </td>
                      <td
                      data-heading="Category"
                      style={{ textAlign: "center" }}
                    >
                      {orderItems?.productId?.category?.categoryName}
                    </td>
                    </>
                    )
                  })} */}
                     
                      <td
                        data-heading="Amount Paid"
                        style={{ textAlign: "center" }}
                      >
                        ${order.totalPrice}
                      </td>
                      <td
                        data-heading="Status"
                        className={`${
                          order.status === "Booked" ? "success" : "warning"
                        }`}
                        style={{ textAlign: "center" }}
                      >
                        {order.status}
                      </td>
                      <td data-heading="Status" style={{ textAlign: "center" }}>
                        <Link
                         state={{orderNumber: order?.orderNumber}}
                          className="btn-outline-table"
                          style={{border: "none"}}
                          onClick={() => {
                            setShowOrder(true);
                            setType(order.type);
                          }}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TabContainer>
  );
}
