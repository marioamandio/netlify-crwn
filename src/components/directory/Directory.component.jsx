import CategoryItem from "../category-item/category-item.component";
import "./Directories.styles.scss"

const Directory = ({categories}) => {
  return (
    <div className="categories-container">
      {categories.map((category) => {
        return <CategoryItem key={category.id} category={category} />;
      })}
    </div>
  );
};

export default Directory;
