import React, {useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CategoryCard from "../../../components/productCard/categoryCard";
import { GET_SUB_CATEGORIES } from "../../../redux/actions/categories";

export default function SubCategories() {
  const { subCategories, subSubCategories } = useSelector(
    (state) => state.CategoriesReducers
  );
  console.log("subCategories data", subCategories);

  const { id } = useParams();

  // Use the categoryName prop from Categories component
  const categoryName = useSelector((state) => state.CategoriesReducers.allCategories.find(category => category._id === id)?.categoryName);


  const startingCharacters = categoryName.slice(0, 5); // Get the startingCharacters character
  const endingCharacters = categoryName.slice(5); // Get the endingCharacters character

  console.log(`starting ${startingCharacters} ending ${endingCharacters}`)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GET_SUB_CATEGORIES(id))
  }, [dispatch, id]);
  


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 text-left">
          <h2 className="fs-2 ">
         {startingCharacters} <span class="border-title">{endingCharacters}</span>
          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
{subCategories?.length <= 0 ? (
  <h2 style={{textAlign: "center"}}>No data Found</h2>
) : (
  subCategories?.map((element, index) => {
    console.log("Element", element?.images)
      return (
        <div
          className="col-md-4 col-sm-6 col-lg-3 col-xl-2 mt-5"
          key={`${element._id}-${index}`}
          id={`${element._id}-${index}`}
        >
          <CategoryCard
            image={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${element?.images[0]}`}
            name={element?.productName}
            params={
              subSubCategories.filter(
                (arr) =>
                  arr.subCategory._id.toString() ===
                  element._id.toString()
              ) > 0
                ? `/sub_sub_categories/${element._id}`
                : `/products/${element._id}`
            }
          />
        </div>
      );
    })
)}

     
      </div>
    </div>
  );
}
