import MultiRangeSlider from 'multi-range-slider-react'
import { useState, useEffect } from 'react'
import { FaAngleDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import {
//   category,
//   subCategories,
//   subSubCategories,
// } from "../../../helpers/headerData";
import ProductCard from '../../../components/productCard'
import Images from '../../../constants/images'
import MainSlider from '../../../components/MainSlider'
import Pagination from '../../../components/pagination'
import { useSelector, useDispatch } from 'react-redux'
// import { GET_All_PRODUCTS } from '../../../redux/actions/products';
import { GET_FEATURED_PRODUCTS } from '../../../redux/actions/products';
import DataNotFound from '../../../components/datanotfound';

export default function Products() {
  const dispatch = useDispatch()

  const { categories, subCategories, subSubCategories } = useSelector(
    (state) => state.CategoriesReducers,
  )
  const [loading, setloading] = useState(false)
  const { featuredProducts } = useSelector((state) => state.ProductsReducers)
  // SLIDER CODE
  const [price, setPrice] = useState({
    minPrice: 0,
    maxPrice: 100,
  })
  const [selectCategoryInfo, setSelectCategoryInfo] = useState({
    categoryId: '',
    sub_categoryId: '',
    sub_sub_categoryId: '',
  })
  const [sortType, setsortType] = useState('Ascending')
  const [selectCategoryInfoName, setSelectCategoryInfoName] = useState({
    categoryName: '',
    sub_categoryName: '',
    sub_sub_categoryName: '',
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

  const handleClearFilter = () => {
    setSelectCategoryInfo({
      categoryId: '',
      sub_categoryId: '',
      sub_sub_categoryId: '',
    })
    setPrice({
      minPrice: 0,
      maxPrice: 100,
    })

    // dispatch(GET_All_PRODUCTS())
    setloading(false)
  }

  const handleSelected = (e, value, categoryType) => {
    if (e.target.checked === true) {
      switch (categoryType) {
        case 'categoryId':
          setSelectCategoryInfo({
            categoryId: value.categoryId,
          })
          setSelectCategoryInfoName({
            categoryName: value.categoryName,
          })
          break
        case 'sub_categoryId':
          setSelectCategoryInfo({
            categoryId: value.categoryId,
            sub_categoryId: value.sub_categoryId,
          })
          setSelectCategoryInfoName({
            categoryName: value.categoryName,
            sub_categoryName: value.sub_categoryName,
          })
          break
        case 'sub_sub_categoryId':
          setSelectCategoryInfo({
            categoryId: value.categoryId,
            sub_categoryId: value.sub_categoryId,
            sub_sub_categoryId: value.sub_sub_categoryId,
          })
          setSelectCategoryInfoName({
            categoryName: value.categoryName,
            sub_categoryName: value.sub_categoryName,
            sub_sub_categoryName: value.sub_sub_categoryName,
          })
          break

        default:
          break
      }
    } else if (e.target.checked === false) {
      switch (categoryType) {
        case 'categoryId':
          setSelectCategoryInfo({
            categoryId: '',
          })
          setSelectCategoryInfoName({
            categoryName: '',
          })
          break
        case 'sub_categoryId':
          setSelectCategoryInfo({
            categoryId: '',
            sub_categoryId: '',
          })
          setSelectCategoryInfoName({
            categoryName: '',
            sub_categoryName: '',
          })
          break
        case 'sub_sub_categoryId':
          setSelectCategoryInfo({
            categoryId: '',
            sub_categoryId: '',
            sub_sub_categoryId: '',
          })
          setSelectCategoryInfoName({
            categoryName: '',
            sub_categoryName: '',
            sub_sub_categoryName: '',
          })
          break

        default:
          break
      }
    }
  }

  // const handleFilterProducts = () => {
  //   dispatch(
  //     GET_All_PRODUCTS(
  //       {
  //         ...selectCategoryInfo,
  //         minPrice: parseInt(price.minPrice),
  //         maxPrice: parseInt(price.maxPrice),
  //       },
  //       '',
  //     ),
  //   )
  //   setloading(true)
  // }

  useEffect(() => {
dispatch(GET_FEATURED_PRODUCTS())
  }, [])

  const plant = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5]
  // useEffect(() => {
  //   dispatch(GET_All_PRODUCTS())
  // }, [])

  return (
    <>
      <MainSlider />
      <div className="container mt-5">
        <div className="row">
          <p className="mb-3">Filters</p>
          <div className="col-lg-3 col-md-4 col-sm-12">
            <div className="category-side p-3">
              <div className="categories p-3">
                <div className="filter-section py-3 mt-3">
                  <div className="d-flex justify-content-between">
                    <div className="text-left">
                      <p className="mb-3">Slider</p>{' '}
                    </div>

                    <div className="text-right">
                      <p>
                        ${price.minPrice} - ${price.maxPrice}
                      </p>
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
                </div>
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
                      onClick={() => {
                        console.log("testing")
                        // handleFilterProducts()
                      }}
                      className="btn btn-solid btn-solid-primary px-5"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="filter-section py-3 mb-3">
                  <div className="d-flex flex-column">
                    <h4 className="fs-4">
                      <span className="border-title">Categories:</span>
                    </h4>
                    <ul className="category-list">
                      {categories?.map((cat, index) => {
                        return (
                          <li
                            className="mt-3"
                            key={index}
                            style={{ display: 'block' }}
                          >
                            <div
                              className="form-check custome-form-check"
                              style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                paddingLeft: '0',
                              }}
                            >
                              <input
                                className="checkbox_animated check-it"
                                type="checkbox"
                                checked={
                                  selectCategoryInfo.categoryId === cat._id
                                    ? true
                                    : false
                                }
                                id={`${cat.category}_box${index}`}
                                name={'categoryId'}
                                onChange={(e) => {
                                  handleSelected(
                                    e,
                                    {
                                      categoryId: cat._id,
                                      categoryName: cat.category,
                                    },
                                    'categoryId',
                                  )
                                }}
                              />
                              <Link
                                to={`#sub-cat-${cat._id}${index}`}
                                className="mx-2"
                                data-bs-toggle="collapse"
                                style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}
                              >
                                {cat.category}

                                <FaAngleDown
                                  style={{
                                    float: 'right',
                                    marginLeft: '.5rem',
                                  }}
                                />
                              </Link>
                            </div>

                            {/* sub category start */}
                            <div
                              className="collapse mx-4 mt-3"
                              id={`sub-cat-${cat._id}${index}`}
                            >
                              <ul>
                                {subCategories.map((sub_cat, index) => {
                                  if (cat?._id === sub_cat.category?._id)
                                    return (
                                      <li
                                        className="mt-3"
                                        key={index}
                                        style={{ display: 'block' }}
                                      >
                                        <div
                                          className="form-check custome-form-check"
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                          }}
                                        >
                                          <input
                                            className="checkbox_animated check-it"
                                            type="checkbox"
                                            checked={
                                              sub_cat?._id ===
                                              selectCategoryInfo.sub_categoryId
                                            }
                                            name={'sub_categoryId'}
                                            onChange={(e) => {
                                              handleSelected(
                                                e,
                                                {
                                                  sub_categoryId: sub_cat?._id,
                                                  categoryId: cat._id,
                                                  sub_categoryName:
                                                    sub_cat.subCategory,
                                                  categoryName: cat.category,
                                                },
                                                'sub_categoryId',
                                              )
                                            }}
                                            // id={`${sub_cat.category}_box${index}`}
                                          />
                                          <Link
                                            to={`#sub-sub-cat-${sub_cat?._id}${index}`}
                                            // to={`/`}
                                            className="mx-2"
                                            data-bs-toggle="collapse"
                                            style={{
                                              display: 'flex',
                                              justifyContent: 'flex-start',
                                              alignItems: 'center',
                                            }}
                                          >
                                            {sub_cat?.subCategory}

                                            <FaAngleDown
                                              style={{
                                                float: 'right',
                                                marginLeft: '.5rem',
                                              }}
                                            />
                                          </Link>
                                        </div>

                                        {/* sub sub category start */}
                                        <div
                                          className="collapse mx-4 mt-3"
                                          id={`sub-sub-cat-${sub_cat?._id}${index}`}
                                        >
                                          <ul>
                                            {subSubCategories.map(
                                              (sub_sub_cat, index) => {
                                                if (
                                                  sub_cat._id ===
                                                  sub_sub_cat.subCategory?._id
                                                ) {
                                                  return (
                                                    <>
                                                      <li
                                                        className="mt-3"
                                                        key={index}
                                                        style={{
                                                          display: 'block',
                                                        }}
                                                      >
                                                        <div
                                                          className="form-check custome-form-check"
                                                          style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                              'flex-start',
                                                            alignItems:
                                                              'center',
                                                          }}
                                                        >
                                                          <input
                                                            className="checkbox_animated check-it"
                                                            type="checkbox"
                                                            checked={
                                                              sub_sub_cat?._id ===
                                                              selectCategoryInfo.sub_sub_categoryId
                                                            }
                                                            name={
                                                              'sub_sub_categoryId'
                                                            }
                                                            onChange={(e) => {
                                                              handleSelected(
                                                                e,
                                                                {
                                                                  sub_categoryId:
                                                                    sub_cat?._id,
                                                                  categoryId:
                                                                    cat._id,
                                                                  sub_sub_categoryId:
                                                                    sub_sub_cat?._id,

                                                                  sub_categoryName:
                                                                    sub_cat.subCategory,
                                                                  categoryName:
                                                                    cat.category,
                                                                  sub_sub_categoryName:
                                                                    sub_sub_cat.subSubCategory,
                                                                },
                                                                'sub_sub_categoryId',
                                                              )
                                                            }}
                                                            // id={`${sub_sub_cat.sub_cat}${index}`}
                                                          />
                                                          <Link
                                                            to={`#sub-sub-cat-${sub_sub_cat._id}${index}`}
                                                            className="mx-2"
                                                            data-bs-toggle="collapse"
                                                            style={{
                                                              display: 'flex',
                                                              justifyContent:
                                                                'flex-start',
                                                              alignItems:
                                                                'center',
                                                            }}
                                                          >
                                                            {
                                                              sub_sub_cat.subSubCategory
                                                            }

                                                            <FaAngleDown
                                                              style={{
                                                                float: 'right',
                                                                marginLeft:
                                                                  '.5rem',
                                                              }}
                                                            />
                                                          </Link>
                                                        </div>
                                                      </li>
                                                    </>
                                                  )
                                                }
                                              },
                                            )}
                                          </ul>
                                        </div>
                                        {/* sub sub category end */}
                                      </li>
                                    )
                                })}
                              </ul>
                            </div>
                            {/* subcategory end */}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  onClick={() => {
                    handleClearFilter()
                  }}
                  className="btn btn-solid btn-solid-primary-rounded btn-block mb-4 mx-2"
                  style={{ fontWeight: 'normal' }}
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 col-sm-12 mt-5 mt-md-5">
            <h2 className=" fs-2 title-color">
              {selectCategoryInfoName.categoryName}
              {/* <span className="border-title-white">/Habib</span> */}
            </h2>
            <div className="row mx-2 mx-md-0 mt-3">
              <div className="col-12 col-lg-6 col-md-6 col-sm-6">
                <h4 className="fs-4">
                  {/* Pla<span className="border-title">nts</span> &gt; Cactus */}
                  <span className="color-white">
                    {selectCategoryInfoName.sub_categoryName}
                  </span>
                </h4>
                <p
                  className="mt-2"
                  style={{ display: loading ? 'block' : 'none' }}
                >
                  {featuredProducts?.length} items found in{' '}
                  {selectCategoryInfoName.categoryName +
                    '>' +
                    selectCategoryInfoName.sub_categoryName}
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
              
              {featuredProducts?.length <= 0 ? (
               <DataNotFound />
              ) : (
                featuredProducts.map((element, index) => {
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
                })?.sort(
                  (a, b) => handleSortProducts(a, b),
              ))
              
              }

            </div>
          </div>
          {featuredProducts?.length > 0 ? (
  <div className="col-12">
    <Pagination />
  </div>
) : null}
        </div>
      </div>
    </>
  )
}
