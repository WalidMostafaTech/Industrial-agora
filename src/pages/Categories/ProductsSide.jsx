import { Link, useSearchParams } from "react-router-dom";
import categoryImg from "../../assets/images/9f8ca255d19a4024444f6d08bbebff24f2a36a06.jpg";
import productImg from "../../assets/images/product-img.png";
import Pagination from "../../components/common/Pagination";
import ProductCard from "../../components/common/ProductCard";
import ProductCardList from "../../components/common/ProductCardList";
import CategoryBanner from "../../components/common/CategoryBanner";

const ProductsList = [...Array(4).keys()].map((item) => ({
  id: item + 1,
  title: "A11VLO190LRDU2/11R-NZD12K02P-S HYDRAULIC PUMP ZL1010000094 ZOOM LION",
  details: {
    status: "Brand New ZL1010000094",
    type: "Concrete pump Spare Parts",
    condition: "Original Packing",
    delivery: "From stock",
    payment: "Advance",
  },
  image: productImg,
}));

const ProductsSide = ({ products = {}, category = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ اقرأ الصفحة من URL أو خليها 1 لو مش موجودة
  const currentPage =
    Number(searchParams.get("page")) || products?.meta?.current_page || 1;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  return (
    <section className="space-y-8 lg:space-y-12 w-full">
      {/* صورة الكاتيجوري */}
      <CategoryBanner image={category?.image} title={category?.title} />

      {/* المنتجات */}
      <ProductCardList ProductsList={products?.items} />

      {/* الباجنيشن */}
      <Pagination
        totalPages={products?.meta?.total}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ProductsSide;
