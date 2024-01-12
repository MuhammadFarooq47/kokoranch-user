import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CategoryCard from "../../../components/productCard/categoryCard";

export default function SubSubCategories() {
  const { subSubCategories } = useSelector((state) => state.CategoriesReducers);
  const { id } = useParams();
  
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 text-left">
          <h2 className="fs-2">
            All Sub Sub Cate<span className="border-title">gories</span>
          </h2>
        </div>
      </div>
      <div className="row justify-content-center">
        {subSubCategories
          .filter((arr) => arr.subCategory._id.toString() === id)
          .map((element, index) => {
            return (
              <div
                className="col-md-4 col-sm-6 col-lg-3"
                key={`${element._id}-${index}`}
                id={`${element._id}-${index}`}
              >
                <CategoryCard
                  image={element.image}
                  name={element.subSubCategory}
                  params={``}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
