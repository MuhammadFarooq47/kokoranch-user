import { useState, useEffect } from 'react'
import { FaSearch, FaAngleDown, FaFilter } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import { GET_All_SELLER_TRADES } from '../../../../redux/actions/trades'
import TradeRequestItem from './TradeRequestItem'
export default function TradeList({ setView, view }) {
  const dispatch = useDispatch()

  const { traderTrades } = useSelector((state) => state.TradesReducers)

  const { _id } = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(GET_All_SELLER_TRADES(_id, localStorage.getItem('token')))
  }, [])

  return (
    <>
      <article className="trader-trade-requests-main">
        <header>
          <div className="right">
            <div className="right_inner-left">
              <div className="table-search-wrappper">
                <input className="form-control" placeholder="Search" />
                <div className="table-icon-wrappper">
                  <FaSearch />
                </div>
              </div>
            </div>
            <div className="right_inner-right">
              <div className="dropdown  custom-dropdown">
                <div
                  className=" dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sort By
                  <FaAngleDown />
                </div>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      New to Old
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Old to New
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="dropdown  custom-dropdown">
                <div
                  className=" dropdown-toggle "
                  type="button"
                  id="dropdownMenuButton2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaFilter className="title-color" />
                  &nbsp;Filter By Date&nbsp; <FaAngleDown />
                </div>
                <ul
                  className="dropdown-menu filter-dropdown"
                  aria-labelledby="dropdownMenuButton2"
                >
                  <div className="date-input-wrapper">
                    <label>From</label>
                    <input type="date" placeholder="02/02/2022" />
                  </div>
                  <div className="date-input-wrapper">
                    <label>To</label>
                    <input
                      type="date"
                      pattern="yy/mm/dd"
                      placeholder="02/03/2022"
                    />
                  </div>
                  <button className="btn btn-solid btn-solid-primary mx-auto">
                    Apply
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </header>

        <div className="table-content table-container">
          <table className="table table-container__table table-container__table--break-md">
            <thead>
              <tr>
                <th className="li-product-remove">Trade Code</th>
                <th className="li-product-thumbnail">In Search Of</th>
                <th className="cart-product-name">Exchange With</th>
                <th className="li-product-price">Unread Comments</th>
                <th className="li-product-price">Last Commented Date</th>
                <th
                  className="li-product-subtotal"
                  style={{ textAlign: 'left' }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {traderTrades?.map((order, index) => {
                return <TradeRequestItem props={order} setView={setView} />
              })}
            </tbody>
          </table>
        </div>
      </article>
    </>
  )
}
