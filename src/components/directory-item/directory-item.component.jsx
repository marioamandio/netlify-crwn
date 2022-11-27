import { Link } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category }) => (
  <DirectoryItemContainer key={category.id}>
    <BackgroundImage imageUrl={category.imageUrl} />
    <Body>
      <Link to={`shop/${category.title}`}>
        <>
          <h2>{category.title}</h2>
          <p>Shop Now</p>
        </>
      </Link>
    </Body>
  </DirectoryItemContainer>
);

export default DirectoryItem;
