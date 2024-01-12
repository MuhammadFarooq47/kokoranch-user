import { useState, useEffect } from 'react'
import { FaPlus, FaRegHeart } from 'react-icons/fa'
import Popup from '../../../components/popUp/popUp'
import { Link } from 'react-router-dom'
import TradeCard from '../../../components/TradeCard'
import Images from '../../../constants/images'
import Pagination from '../../../components/pagination'
import { useSelector, useDispatch } from 'react-redux'
import { GET_All_SELLER_TRADES } from '../../../redux/actions/trades'
import { useParams } from 'react-router-dom'
export default function SellerItems() {
  const dispatch = useDispatch()
  const { sellerTrades } = useSelector((state) => state.TradesReducers)
  const { traderId } = useParams()
  // SLIDER CODE
  const [popupOpen, setPopupOpen] = useState(false)
  const [successPopupOpen, setSuccessPopupOpen] = useState(false)
  const [sortType, setsortType] = useState('Newest First')

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const handleSortServices = (a, b) => {
    if (sortType == '   Price Low to High') {
      return a.cost > b.cost ? 1 : -1
    } else if (sortType == '   Price High to Low') {
      return a.cost < b.cost ? 1 : -1
    } else if (sortType == 'Newest First') {
      return new Date(b.createdAt) < new Date(a.createdAt)
    } else if (sortType == 'Oldest First') {
      return new Date(a.createdAt) > new Date(b.createdAt)
    }
  }
  useEffect(() => {
    dispatch(GET_All_SELLER_TRADES(traderId))
  }, [])
  return (
    <>
      <div className="container mt-5">
        <div className="col-12">
          <div className="dark-card">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div
                  className="col-12 d-flex"
                  style={{ justifyContent: 'flex-start' }}
                >
                  <div className="profile-image">
                    <img
                      src={Images.Pictures.profile}
                      width={150}
                      height={150}
                      alt="Profile"
                    />
                    <div className="gradient-card plus-sign">
                      <FaPlus />
                    </div>
                  </div>
                  <div
                    className="mt-5"
                    style={{ width: '100%', textAlign: 'left' }}
                  >
                    <h2 className="fs-2">
                      {sellerTrades
                        ? sellerTrades[0].traderId?.firstName +
                          ' ' +
                          sellerTrades[0].traderId?.lastName
                        : ''}
                    </h2>
                    <p className="title-color">
                      {' '}
                      {sellerTrades
                        ? sellerTrades[0].traderId?.firstName +
                          ' ' +
                          sellerTrades[0].traderId?.lastName
                        : ''}
                    </p>
                    <p>
                      <FaRegHeart /> Add to favorites
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                {/* <p className="mt-5 text-left">
                  Excellent Service, High-End Products, Fastest Logistics. You
                  will get a positive feedback after your payment in 1 day ：）
                </p> */}
                <button
                  onClick={() => setPopupOpen(true)}
                  className="btn btn-solid btn-solid-primary-rounded "
                  style={{
                    width: '20rem',
                    marginTop: '4rem',
                    float: 'right',
                    fontWeight: 'normal',
                    fontSize: '1.3rem',
                  }}
                >
                  Contact Trader
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="container mt-5">
            <div className="dark-card">
              <div className="row">
                <div
                  className="col-12 col-lg-6 col-md-6 col-sm-6"
                  style={{ textAlign: 'left' }}
                >
                  <h2 className="fs-2">
                    Trade of{' '}
                    <span className="border-title">
                      {' '}
                      {sellerTrades
                        ? sellerTrades[0].traderId.firstName +
                          ' ' +
                          sellerTrades[0].traderId?.lastName
                        : ''}
                    </span>
                  </h2>
                </div>
                <div className="col-12 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-start justify-content-md-end justify-content-sm-end my-4 my-sm-0 my-md-0 my-lg-0 ">
                  <div className="dropdown custom-dropdown">
                    <Link
                      className="btn btn-outline-light dropdown-toggle px-5 fw-light"
                      to="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Sort By : {sortType ? sortType : ''}
                    </Link>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {/* <li>
                        <Link
                          onClick={() => {
                            setsortType('  Price Low to High')
                          }}
                          className="dropdown-item"
                          to="#"
                        >
                          Price Low to High
                        </Link>
                      </li> */}
                      {/* <li>
                        <Link
                          onClick={() => {
                            setsortType('   Price High to Low')
                          }}
                          className="dropdown-item"
                          to="#"
                        >
                          Price High to Low
                        </Link>
                      </li> */}

                      <li>
                        <Link
                          onClick={() => {
                            setsortType('  Newest First')
                          }}
                          className="dropdown-item"
                          to="#"
                        >
                          Newest First
                        </Link>
                      </li>

                      <li>
                        <Link
                          onClick={() => {
                            setsortType('  Oldest First')
                          }}
                          className="dropdown-item"
                          to="#"
                        >
                          Oldest First
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {sellerTrades
                  ?.sort((a, b) => handleSortServices(a, b))
                  .map((element, index) => {
                    return (
                      <div className="col-md-6 col-sm-12 col-lg-6">
                        <TradeCard
                          props={element}
                          key={index}
                          image={Images.Pictures.tradeImage}
                        />
                      </div>
                    )
                  })}
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </div>
      <Popup open={popupOpen} setOpen={setPopupOpen}>
        <div className="model-contact-wrapper">
          <h2 className=" fs-2 model-contact-wrapper_popup-title text-center">
            Contact
          </h2>
          <form
            className="model-contact-wrapper_popup-body"
            onSubmit={(e) => {
              e.preventDefault()
              setPopupOpen(false)
              setSuccessPopupOpen(true)
            }}
          >
            <div className="model-contact-wrapper_popup-body_input-wrapper">
              <label for="firstName" className="form-label">
                Message
              </label>
              <textarea
                type="text"
                className="form-control"
                id="firstName"
                // value={user.firstName}
                // onChange={onchange}
                rows={8}
                name="firstName"
                placeholder="Type Message Here.."
                // required
              ></textarea>
            </div>
            <button
              className="btn btn-solid btn-solid-primary-rounded model-contact-wrapper_popup-body_button mx-auto"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </Popup>
      <Popup open={successPopupOpen} setOpen={setSuccessPopupOpen}>
        <div className="model-wrapper">
          <img
            src={Images.Pictures.successCheck}
            className="model-wrapper_image"
            alt="Success"
          />
          <p className="model-wrapper_text">Your Message sent</p>
          <button
            className="btn btn-solid btn-solid-primary-rounded model-wrapper_button "
            onClick={() => setSuccessPopupOpen(false)}
          >
            Close
          </button>
        </div>
      </Popup>
    </>
  )
}
