import React, {useState} from 'react';
import { AiTwotoneStar } from "react-icons/ai";
import { useNavigate, useLocation } from 'react-router-dom';
import DataNotFound from '../../../components/datanotfound';
import {RiDeleteBin5Fill} from "react-icons/ri";


function VendorProductReviews() {
const navigate = useNavigate()
const location = useLocation();

const reviewsData = location?.state?.data;
console.log("VendorProductReviews", reviewsData?.reviews?.length)

  return (
<>
  {reviewsData?.reviews?.length > 0 ? (
    <>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <h2 style={{ fontWeight: 'normal' }}>Total Reviews {reviewsData?.reviews?.length}</h2>
        <h3 className="mx-3" style={{ cursor: "pointer" }} onClick={() => { navigate(-1); }}>
          <span className="vtext-primary mx-2">&#10229;</span>Back
        </h3>
      </div>
      <hr style={{ width: '100%', backgroundColor: '#707070', height: '1px' }} />
      {reviewsData?.reviews?.map((data, index) => {
        console.log("data.....................", data)
        return (
          <div key={index}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', height: '90%', padding: 0 }}>
              <>
                <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="ratingPopup">
                  <div style={{ height: '40vh', width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3>{`${data?.user?.firstName} ${data?.user?.lastName}`}</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <AiTwotoneStar size={20} fill={'#14A384'} />
                  <AiTwotoneStar size={20} fill={'#14A384'} />
                  <AiTwotoneStar size={20} fill={'#14A384'} />
                  <AiTwotoneStar size={20} />
                  <AiTwotoneStar size={20} />
                </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '12px' }}>{data?.review}</span>
                    <label style={{ color: '#4180FE', fontSize: '14px', cursor: 'pointer' }}>Reply</label>
                    <hr style={{ width: '100%', backgroundColor: '#707070', height: '1px', marginBottom: '10px' }} />
                  </div>
                </div>
              </>
            </div>
          </div>
        );
      })}
    </>
  ) : (
    <>
    <h3 className="mx-3" style={{ cursor: "pointer", display: "flex", justifyContent: "flex-end" }} onClick={() => { navigate(-1); }}>
    <span className="vtext-primary mx-2">&#10229;</span>Back
  </h3>
    <div style={{display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: "center", alignSelf: "flex-start"}}> 
    <RiDeleteBin5Fill size={50} className='mb-4' color='#fff' />
    <h2 style={{textAlign: "center", color:'#757575'}}>Data not Found</h2>
    </div>
     </>
  )}
</>

  )
}

export default VendorProductReviews