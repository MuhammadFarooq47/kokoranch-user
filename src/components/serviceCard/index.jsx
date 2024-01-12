import React from 'react'
import { Link } from 'react-router-dom'
import Images from '../../constants/images'

export default function ProductCard({ props }) {
  const plant = [1, 2, 3, 4, 5]
  return (
    <Link to={`/service/${props?._id}`}>
      <div className="service-card  ">
        <div className="text-box d-flex flex-column flex-lg-row flex-md-row ">
          <div className="image-box" style={{ width: '92rem  ' }}>
            <img src={props?.image} alt="aa" />
          </div>
          <div className="text-container" style={{ padding: '2rem 1.8rem' }}>
            <h3 className="fs-4">{props?.title}</h3>
            <div className="row mt-3">
              <div className="col-12 rating-wrapper">
                {plant.map((element, index) => {
                  return (
                    <img
                      key={index}
                      src={Images.Pictures.plant}
                      alt="Plant Icon"
                      width={11}
                      height={11}
                    />
                  )
                })}
                <span>3.4</span>
              </div>
              <div className="col-12">
                <h4 className="  ">Service Description</h4>
                <p className="mt-5">{props?.description}</p>
              </div>
            </div>
          </div>
          <div className="text-container" style={{ width: '50% ' }}>
            <h5 className="fs-5 ">$ {props?.cost}</h5>
          </div>
        </div>
      </div>
    </Link>
  )
}
