import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CategoryCard from "../../../components/productCard/categoryCard";

export default function Categories() {
  const { allCategories } = useSelector((state) => state.CategoriesReducers);

  const location = useLocation(); // Use useLocation to access the current location

  const handleCategoryClick = (id) => {
    // Build the new path by appending the category ID to the current pathname
    const newPath = `${location.pathname}/sub_categories/${id}`;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 text-left">
          <h2 className="fs-2">
            All Cate<span className="border-title">gories</span>
          </h2>
        </div>
      </div>
      <div className="row">
        {allCategories?.length <= 0? (
          <h2 style={{textAlign: "center"}}>No data Found</h2>
        ) : (
          allCategories.map((element, index) => {
            return (
              <div
                className="col-md-4 col-6 col-lg-3 col-xl-2 mt-5"
                key={`${element._id}-${index}`}
                id={`${element._id}-${index}`}
              >
                <CategoryCard
                  image={`https://kokoranch-development.s3.ap-south-1.amazonaws.com/${element?.icon}`}
                  name={element.categoryName}
                  params={`/sub_categories/${element._id}`}
                  // categoryName={element.categoryName} // Pass categoryName as a prop
                   onClick={() => handleCategoryClick(element._id)} // Call handleCategoryClick on click
                />
              </div>
            );
          })
        )}
       
      </div>
    </div>
  );
}
