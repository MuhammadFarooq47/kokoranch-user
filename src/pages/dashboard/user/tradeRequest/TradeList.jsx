import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import { GET_USER_TRADE_REQUEST_ACTION } from '../../../../redux/actions/trades'
export default function TradeList({ setShowTrade }) {
  const dispatch = useDispatch()
  const { userTradeRequests } = useSelector((state) => state.TradesReducers)
  const { _id } = JSON.parse(localStorage.getItem('userData'))
  useEffect(() => {
    dispatch(GET_USER_TRADE_REQUEST_ACTION(_id, localStorage.getItem('token')))
  }, [])

  return (
    <div className="row trade-request-wrapper">
      <div className="col-12">
        <h2 className="fs-2 mb-3">Trade Request</h2>
      </div>
      <div className="col-12 trade-request-wrapper_inner-wrapper ">
        <div className="table-content table-container">
          <table className="table table-container__table table-container__table--break-md">
            <thead>
              <tr>
                <th
                  className="li-product-remove"
                  style={{ paddingBottom: '2rem' }}
                >
                  Date
                </th>
                <th
                  className="li-product-thumbnail"
                  style={{ paddingBottom: '2rem' }}
                >
                  Comment
                </th>
                <th
                  className="cart-product-name"
                  style={{ textAlign: 'center', paddingBottom: '2rem' }}
                >
                  Trader Reply
                </th>
                <th
                  className="li-product-price"
                  style={{ textAlign: 'center', paddingBottom: '2rem' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userTradeRequests?.map((item, index) => {
                return (
                  <tr Key={index}>
                    <td data-heading="Date">
                      {' '}
                      {moment(item?.createdAt).format(
                        'MMM DD YYYY h:mm A',
                      )}{' '}
                    </td>
                    <td data-heading="Comment">{item.tradeRequestMessage} </td>
                    <td
                      data-heading="Trader Reply"
                      style={{ textAlign: 'center' }}
                    >
                      {item.isViewedTrader ? 'Seen' : '  Unseen'}
                    </td>
                    <td data-heading="Status" style={{ textAlign: 'center' }}>
                      <Link to={'/trade/' + item.tradeId}>
                        <button className="btn-outline-table">View</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
