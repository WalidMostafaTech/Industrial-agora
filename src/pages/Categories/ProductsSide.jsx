import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import ProductCardList from "../../components/common/ProductCardList";
import CategoryBanner from "../../components/common/CategoryBanner";

const ProductsSide = ({ products = {}, category = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || products?.meta?.current_page || 1;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  return (
    <section className="space-y-8 lg:space-y-12 w-full">
      {(category?.image || category?.title) && (
        <CategoryBanner image={category?.image} title={category?.title} />
      )}

      <ProductCardList ProductsList={products?.items} />

      <Pagination
        totalPages={products?.meta?.total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ProductsSide;
