import ProductCard from "./ProductCard";

const ProductCardList = ({ ProductsList }) => {
  return (
    <div className="space-y-8 lg:space-y-12">
      {ProductsList.map((product) => (
        <ProductCard key={product.id} product={product} badge="offered" />
      ))}
    </div>
  );
};

export default ProductCardList;
