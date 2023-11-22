import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
// import { GET_TRADE } from '../../../../redux/actions/trades'
function TradeRequestItem({ props, setView }) {
  const dispatch = useDispatch()

  // const { trade } = useSelector((state) => state.TradesReducers)

  const [totalUnreadComments, settotalUnreadComments] = useState(0)
  const [lastCommented, setlastCommented] = useState('')
  const caculateUnreadComments = (comments) => {
    let totalUnreadComments = 0

    for (let comment of comments) {
      if (comment.isViewedTrader === false) {
        totalUnreadComments++
      }
    }

    settotalUnreadComments(totalUnreadComments)
  }
  const getLastCommentDate = (comments) => {
    if (comments.length == 0) {
      setlastCommented('None')
    } else {
      const lastCommentItem = comments[comments.length - 1]

      setlastCommented(moment(lastCommentItem).format('MMM DD YYYY h:mm A'))
    }
  }
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }
  useEffect(() => {
    if (props) {
      caculateUnreadComments(props.tradeRequests)
      getLastCommentDate(props.tradeRequests)
    }
  }, [props])

  return (
    <tr key={props._id}>
      <td data-heading="Trade No">{props._id}</td>
      <td data-heading="In Search Of">{truncate(props.inSearchOf, 20)}</td>
      <td data-heading="Exchange With">{truncate(props.toExchangeWith, 20)}</td>
      <td data-heading="UnRead Comments">
        {<span className="title-color">{totalUnreadComments}</span>}
        &nbsp;Comments
      </td>
      <td data-heading="Upload Date">{lastCommented ? lastCommented : ''}</td>
      <td
        data-heading="Action"
        className="d-flex"
        style={{ textAlign: 'left' }}
      >
        <button
          className="btn btn-solid btn-solid-primary px-4 color-white"
          onClick={() => {
            setView('single-trader-request')
            // dispatch(GET_TRADE(props._id))
          }}
        >
          View
        </button>
      </td>
    </tr>
  )
}

export default TradeRequestItem
