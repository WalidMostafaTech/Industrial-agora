import EmptyData from "../sections/EmptyData";
import ProductCard from "./ProductCard";

const ProductCardList = ({ ProductsList = [] }) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {ProductsList.length ? (
        ProductsList.map((product) => (
          <ProductCard key={product.id} product={product} badge="offered" />
        ))
      ) : (
        <EmptyData />
      )}
    </div>
  );
};

export default ProductCardList;
