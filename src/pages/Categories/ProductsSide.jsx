import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../../components/common/Pagination";
import ProductCardList from "../../components/common/ProductCardList";
import CategoryBanner from "../../components/common/CategoryBanner";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const ProductsSide = ({ products = {}, category = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

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

      <div>
        <Link
          to={`/add-product?category=${category?.id}`}
          className="mainBtn success w-fit me-auto mb-4"
        >
          {t("addProduct")} <LuPlus className="text-xl!" />
        </Link>

        <ProductCardList ProductsList={products?.items} />
      </div>

      <Pagination
        totalPages={products?.meta?.last_page}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ProductsSide;
