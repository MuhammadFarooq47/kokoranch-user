import React from 'react'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Pagination = () => {
  return (
    <nav className="page-section">
      <ul className="pagination">
        <Link to="/">
          <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle">
            <FaAngleLeft />
          </li>
        </Link>
        <div className="d-flex justify-content-start pagination-counts-wraspper">
          <Link to="/">
            <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle active">
              1
            </li>
          </Link>
          <Link to="/">
            <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle ">
              2
            </li>
          </Link>
          <Link to="/">
            <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle ">
              3
            </li>
          </Link>
          <Link to="/">
            <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle ">
              4
            </li>
          </Link>
        </div>

        <Link to="/">
          <li className="page-item icon-btn icon-btn-md btn-solid btn-solid-primary-rounded btn-circle">
            <FaAngleRight />
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default Pagination
