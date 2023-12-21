import React, { useState } from 'react';
import { AiTwotoneStar } from "react-icons/ai";
import { useNavigate, useLocation } from 'react-router-dom';
import DataNotFound from '../../../components/datanotfound';
import { RiDeleteBin5Fill } from "react-icons/ri";
import Rating from 'react-rating';
import Images from '../../../constants/images';
import NavBar from './NavBar';

function VendorProductReviews({ setSidebar, sidebar }) {
  const navigate = useNavigate()
  const location = useLocation();
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);

  const reviewsData = location?.state?.data;

  
  const showTextarea = (index) => {
    setSelectedReviewIndex(index);
  };
  const hideTextarea = () => {
    setSelectedReviewIndex(null);
  };

  return (
    <>
    <NavBar setSidebar={setSidebar} sidebar={sidebar} title="Product Reviews" />
      {reviewsData?.reviews?.length > 0 ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h2 style={{ fontWeight: 'normal' }}>Total Reviews {reviewsData?.reviews?.length}</h2>
            <h3 className="mx-3" style={{ cursor: "pointer" }} onClick={() => { navigate(-1); }}>
              <span className="vtext-primary mx-2">&#10229;</span>Back
            </h3>
          </div>
          <hr style={{ width: '100%', backgroundColor: '#707070', height: '1px' }} />
          {reviewsData?.reviews?.map((data, index) => (
            <div key={index}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', height: '90%', padding: 0 }}>
                <>
                  <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="ratingPopup">
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h3>{`${data?.user?.firstName} ${data?.user?.lastName}`}</h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Rating
                              start={0}
                              stop={5}
                              readonly
                              placeholderRating={data?.rating}
                              placeholderSymbol={[
                                <img
                                  width="20"
                                  src={Images.Pictures.plant}
                                  alt="full"
                                ></img>,
                              ]}
                              emptySymbol={[
                                <img
                                  width="20"
                                  src={Images.Pictures.emptyPlant}
                                  alt="empty"
                                ></img>,
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px' }}>{data?.review}</span>
                      <div style={{display: 'flex'}}> 
                      <label
                        style={{ color: '#4180FE', fontSize: '14px', cursor: 'pointer' }}
                        onClick={() => showTextarea(index)}
                      >
                        Reply
                      </label>
                      <label
                        style={{ color: 'red', fontSize: '14px', cursor: 'pointer', marginLeft: 20 }}
                        onClick={hideTextarea}
                      >
                        Cancel
                      </label>
                      </div>
                      {selectedReviewIndex === index && (
                        <textarea
                          rows={4}
                          id={`replyTextarea-${index}`}
                          name={`Reply-${index}`}
                          placeholder="Add your reply here..."
                          required
                          className="form-control"
                          style={{ border: '1px solid #FFFFFF', color: '#FFFFFF', backgroundColor: 'transparent' }}
                        ></textarea>
                      )}
                      <hr style={{ width: '100%', backgroundColor: '#707070', height: '1px', marginBottom: '10px' }} />
                    </div>
                  </div>
                </>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="mx-3" style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }} onClick={() => { navigate(-1); }}>
            <span className="vtext-primary mx-2">&#10229;</span>Back
          </h3>
          <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", alignSelf: "flex-start" }}>
            <RiDeleteBin5Fill size={50} className='mb-4' color='#fff' />
            <h2 style={{ textAlign: "center", color: '#757575' }}>Data not Found</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default VendorProductReviews;
