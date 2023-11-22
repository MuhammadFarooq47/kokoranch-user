import React, { useState, useEffect } from 'react'
import { FaAngleLeft, FaRegPaperPlane } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  DELETE_TRADE_REQUEST_ACTION,
  CREATE_TRADE_REQUEST_MESSAGE_ACTION,
  // GET_TRADE,
} from '../../../../redux/actions/trades'
import TradeRequestMessageReply from './TradeRequestMessageReply'
// import ReactImageMagnify from "react-image-magnify";

export default function TradeRequest({ setView, singleTrade }) {
  const { trade, createtradeRequestMessage } = useSelector(
    (state) => state.TradesReducers,
  )
  const { _id } = JSON.parse(localStorage.getItem('userData'))
  const [previewImage, setPeviewImage] = useState(trade ? trade?.images[0] : '')
  const dispatch = useDispatch()
  const [tradeRequestComment, settradeRequestComment] = useState('')
  // handle image change

  const handleReplyRequest = (tradeRequestId) => {
    if (tradeRequestComment != '') {
      const data = {
        tradeRequestId,
        traderId: _id,
        tradeRequestComment,
      }
      dispatch(
        CREATE_TRADE_REQUEST_MESSAGE_ACTION(
          data,
          localStorage.getItem('token'),
        ),
      )
      settradeRequestComment('')
    } else {
    }
  }
  const handleImageChange = (e, image) => {
    setPeviewImage(image)
    const elems = document.querySelectorAll(
      '.trader-trade-request-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image',
    )
    elems.forEach((elem) => {
      elem.classList.remove('image-thumb-active')
    })
    e.target.classList.add('image-thumb-active')
  }
  useEffect(() => {
    if (createtradeRequestMessage) {
      // dispatch(GET_TRADE(trade._id, localStorage.getItem('token')))
      settradeRequestComment('')
    }
  }, [createtradeRequestMessage])

  return (
    <>
      <div className="trader-trade-request-wrapper mt-5">
        <div className="trader-trade-request-wrapper_top-wrapper">
          {' '}
          <h2 className="fs-2">View Trade Product</h2>
          <div
            className="trader-trade-request-wrapper_top-wrapper_icon-wrapper"
            onClick={() => setView(null)}
          >
            <FaAngleLeft />
            &nbsp;Back
          </div>
        </div>
        <div className="trader-trade-request-wrapper_image-desc-wrapper">
          <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-image-wrapper">
            <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-image-wrapper_trade-image">
              <img src={previewImage} alt="trade"></img>
            </div>
            <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs">
              {trade?.images.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="trader-trade-request-wrapper_image-desc-wrapper_trade-image-wrapper_trade-thumbs_trade-thumb-image"
                    src={image}
                    onClick={(e) => {
                      handleImageChange(e, image)
                    }}
                    alt="trade"
                  />
                )
              })}
            </div>
          </div>
          <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description">
            <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_top">
              <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_top_left">
                <h3 className="fs-3 "> IN SEARCH OF:</h3>
                <p>{trade?.inSearchOf}</p>
              </div>

              <Link to={'/trade/' + trade?._id}>
                <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_top_right">
                  <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_top_right_seller-details-wrapper">
                    <button
                      className="btn btn-solid btn-solid-primary"
                      style={{ width: '15rem' }}
                    >
                      View Post
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_bottom">
              <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_bottom_inner-top">
                <h3 className="fs-3 "> TO EXCHANGE WITH:</h3>
                <p>{trade?.toExchangeWith}</p>
              </div>
              <div className="trader-trade-request-wrapper_image-desc-wrapper_trade-description_bottom_inner-bottom">
                <label for="firstName" className="form-label fs-4">
                  Details
                </label>
                <div className="form-control"> {trade?.details}</div>
              </div>
            </div>
          </div>
        </div>
        {/* shipping , ratings and reviews start */}
        <div className="row trader-trade-request-wrapper_tabs">
          <div className="col-12">
            <div className="tab-content" id="myTabContent">
              {/* rating and reviews tab start */}
              <div
                className="tab-pane fade show active"
                id="ratings-reviews"
                role="tabpanel"
                aria-labelledby="ratings-reviews-tab"
              >
                <div className="tab-content_ratings-reviews">
                  <div className="tab-content_ratings-reviews_customer-reviews-wrapper">
                    <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_title">
                      Comments
                    </h3>
                    {trade?.tradeRequests.length != 0
                      ? trade?.tradeRequests.map((trade_request, index) => {
                          return (
                            <div
                              className="tab-content_ratings-reviews_customer-reviews-wrapper_review"
                              key={index}
                            >
                              <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper">
                                <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_left">
                                  <h4 className="fs-4 tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_left_name">
                                    {trade_request?.user.firstName +
                                      ' ' +
                                      trade_request?.user.lastName}
                                  </h4>

                                  <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_left_date">
                                    {moment(trade_request?.createdAt).format(
                                      'MMM DD YYYY h:mm A',
                                    )}{' '}
                                  </span>
                                </div>
                                <div
                                  onClick={() => {
                                    dispatch(
                                      DELETE_TRADE_REQUEST_ACTION(
                                        trade_request._id,
                                        localStorage.getItem('token'),
                                      ),
                                    )
                                  }}
                                  className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_right"
                                >
                                  <h4 className="fs-4 tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_right_delete-btn">
                                    Delete Comment
                                  </h4>
                                </div>
                              </div>
                              <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_content">
                                {trade_request?.tradeRequestMessage}
                              </p>
                              <br />
                              {trade_request?.tradeRequestComments.map(
                                (item1, index) => {
                                  return (
                                    <>
                                      <div className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper">
                                        <h3 className="fs-3 tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_inner-wrapper_name">
                                          {item1.traderId.firstName +
                                            ' ' +
                                            item1.traderId.lastName}
                                          <span className="title-color fs-6">
                                            (Trader)
                                          </span>

                                          <span className="tab-content_ratings-reviews_customer-reviews-wrapper_review_inner-wrapper_left_date">
                                            {' ' +
                                              moment(
                                                trade_request?.createdAt,
                                              ).format('MMM DD YYYY h:mm A') +
                                              ' '}{' '}
                                          </span>
                                        </h3>
                                      </div>
                                      <p className="tab-content_ratings-reviews_customer-reviews-wrapper_review_replay-wrapper_content">
                                        {item1?.tradeRequestComment}
                                      </p>
                                    </>
                                  )
                                },
                              )}
                              <br />
                              <TradeRequestMessageReply
                                trade_request={trade_request}
                                settradeRequestComment={settradeRequestComment}
                                handleReplyRequest={handleReplyRequest}
                                tradeRequestComment={tradeRequestComment}
                              />
                            </div>
                          )
                        })
                      : 'No Comments Found!'}
                    <div></div>
                  </div>
                </div>
              </div>
              {/* rating and reviews tab end */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
