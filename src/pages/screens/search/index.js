import MultiRangeSlider from 'multi-range-slider-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../../components/productCard'
import Images from '../../../constants/images'
import MainSlider from '../../../components/MainSlider'
import Pagination from '../../../components/pagination'
import { useSelector, useDispatch } from 'react-redux'
// import { GET_SEARCH_PRODUCTS_ACTION } from '../../../redux/actions/products'
import { useParams } from 'react-router-dom'
export default function Products() {
  const { searchText, searchCategory } = useParams()
  const { searchProducts, Allproducts } = useSelector(
    (state) => state.ProductsReducers,
  )

  const [searchPageProducts, setSearchPageProducts] = useState([])
  const [sortType, setsortType] = useState('Ascending')
  const dispatch = useDispatch()
  // SLIDER CODE
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 100,
  })
  const handleInput = (e) => {
    setPrice({
      ...price,
      [e.target.name]: e.target.value,
    })
  }
  const handleSortProducts = (a, b) => {
    if (sortType == '   Price Low to High') {
      return a.cost > b.cost ? 1 : -1
    } else if (sortType == '   Price High to Low') {
      return a.cost < b.cost ? 1 : -1
    } else if (sortType == 'Newest First') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortType == 'Oldest First') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
  }
  const handleSearchProducts = () => {
    const token = localStorage.getItem('token')
    const condition = {
      searchText: searchText,
      category: searchCategory,
      minPrice: price.minPrice.toString(),
      maxPrice: price.maxPrice.toString(),
    }
    if (searchText && searchCategory) {
      console.log("search Text")
      // dispatch(GET_SEARCH_PRODUCTS_ACTION(condition, token))
    }
  }

  const handleClearFilter = () => {
    setPrice({
      minPrice: 0,
      maxPrice: 100,
    })
    const token = localStorage.getItem('token')
    const condition = {
      searchText: searchText,
      category: searchCategory,
    }
    if (searchText && searchCategory) {
      console.log("Search Text 2")
      // dispatch(GET_SEARCH_PRODUCTS_ACTION(condition, token))
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    const condition = {
      searchText: searchText,
      category: searchCategory,
      minPrice: price.minPrice,
      maxPrice: price.maxPrice,
    }
    if (searchText && searchCategory) {
      console.log("Search Text 3")
      // dispatch(GET_SEARCH_PRODUCTS_ACTION(condition, token))
    }
  }, [searchText, searchCategory, price])

  useEffect(() => {
    if (searchProducts) {
      setSearchPageProducts(searchProducts)
    } else {
      setSearchPageProducts(Allproducts)
    }
  }, [searchProducts])

  return (
    <>
      <MainSlider />
      <div className="container mt-5 search-wrapper">
        <div className="row">
          <p className="mb-4">Filter</p>
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="category-side p-3">
              <div className="categories p-3">
                {/* <div className="filter-section py-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="text-left">
                  <p className="mb-3">Slider</p>{' '} 
                    </div>

                    <div className="text-right">
                      <p>${price.minPrice} - ${price.maxPrice}{' '}</p>
                    </div>
                  </div>
                  <MultiRangeSlider
                    style={{ boxShadow: 'none' }}
                    min={0}
                    max={100}
                    step={5}
                    ruler={false}
                    label={false}
                    preventWheel={false}
                    minValue={price.minPrice}
                    maxValue={price.maxPrice}
                    onChange={(e) => {
                      handleInput(e)
                    }}
                  />
                </div> */}
                <div className="filter-section py-3">
                  <div className="text-left">
                    <h4 className="fs-4">Price</h4>
                  </div>

                  <div className=" mt-2 mb-2  price-div">
                    <div className="price-input-div">
                      <div className="d-flex justify-content-start align-items-center">
                        <h3 className="fs-3 d-inline-block mx-2">$</h3>{' '}
                        <input
                          type="number"
                          className="form-control px-2"
                          placeholder="Min"
                          name="minPrice"
                          value={price.minPrice}
                          onChange={(e) => {
                            handleInput(e)
                          }}
                        />
                      </div>

                      <h3 className="fs-3 d-inline-block">-</h3>
                      <div className="d-flex justify-content-start align-items-center">
                        <h3 className="fs-3 d-inline-block mx-2"> $</h3>{' '}
                        <input
                          type="number"
                          className="form-control px-2"
                          placeholder="Max"
                          name="maxPrice"
                          value={price.maxPrice}
                          onChange={(e) => {
                            handleInput(e)
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => handleSearchProducts()}
                      className="btn btn-solid btn-solid-primary px-5"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  onClick={() => handleClearFilter()}
                  className="btn btn-solid btn-solid-primary btn-block mb-4 mx-2"
                >
                  CLEAR ALL FILTER
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-8 col-md-6 col-sm-12  product-wrapper">
            <h2
              className="fs-2"
              style={{ display: searchCategory ? 'block' : 'none' }}
            >
              Search: &nbsp;
              <span className="title-color">
                {searchText} &nbsp;
                {/* <span className="border-title-white">Plants</span> */}
              </span>
            </h2>
            <div className="row mx-2 mx-md-0 mt-3">
              <div className="col-6">
                <p
                  className="mt-2"
                  style={{ display: searchCategory ? 'block' : 'none' }}
                >
                  {searchProducts?.length !== 0
                    ? searchProducts?.length > 1
                      ? searchProducts?.length + ' ' + 'items'
                      : searchProducts?.length + ' ' + 'item'
                    : 0 + 'items'}{' '}
                  found in {searchCategory}
                </p>
              </div>
              <div className="col-12 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-start justify-content-md-end justify-content-sm-end my-4 my-sm-0 my-md-0 my-lg-0">
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
                    <li>
                      <Link
                        onClick={() => {
                          setsortType('  Price Low to High')
                        }}
                        className="dropdown-item"
                        to="#"
                      >
                        Price Low to High
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => {
                          setsortType('   Price High to Low')
                        }}
                        className="dropdown-item"
                        to="#"
                      >
                        Price High to Low
                      </Link>
                    </li>

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
              {searchProducts?.length !== 0 ? (
                searchPageProducts
                  ?.map((element, index) => {
                    return (
                      <div
                        className="col-12 col-md-6 col-lg-3 col-sm-6"
                        key={index}
                      >
                        <ProductCard
                          product={element}
                          image={Images.Pictures.product[0]}
                        />
                      </div>
                    )
                  })
                  ?.sort(
                    (a, b) => handleSortProducts(a, b),

                    // return a.cost > b.cost ? 1 : -1
                  )
              ) : (
                <h2 className="fs-2">No Products Found</h2>
              )}
            </div>
          </div>
          <div className="col-12">
            <Pagination />
          </div>
        </div>
      </div>
    </>
  )
}
