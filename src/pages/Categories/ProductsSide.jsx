import { Link, useSearchParams } from "react-router-dom";
import categoryImg from "../../assets/images/9f8ca255d19a4024444f6d08bbebff24f2a36a06.jpg";
import productImg from "../../assets/images/product-img.png";
import Pagination from "../../components/common/Pagination";

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

const ProductsSide = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ اقرأ الصفحة من URL أو خليها 1 لو مش موجودة
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  return (
    <section className="space-y-8 lg:space-y-12">
      {/* صورة الكاتيجوري */}
      <div className="relative h-[250px] lg:h-[400px] overflow-hidden">
        <img
          src={categoryImg}
          alt="category"
          className="w-full h-full object-cover"
        />
        <h3
          className="absolute bottom-0 start-0 text-2xl font-bold text-white bg-myBlue-1 capitalize
          py-2 px-4 lg:py-4 lg:px-8 pe-10 lg:pe-16"
          style={{ clipPath: "polygon(0 0, 81% 0, 100% 100%, 0 100%)" }}
        >
          category
        </h3>
      </div>

      {/* المنتجات */}
      <div className="space-y-8 lg:space-y-12">
        {ProductsList.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center bg-stone-200 shadow-md"
          >
            <div className="w-full md:w-1/3 h-[300px] overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-4 p-4">
              <h4 className="text-lg font-bold line-clamp-2">
                {product.title}
              </h4>

              <div>
                <p className="text-gray-600">
                  Status : {product.details.status}
                </p>
                <p className="text-gray-600">Type : {product.details.type}</p>
                <p className="text-gray-600">
                  Condition : {product.details.condition}
                </p>
                <p className="text-gray-600">
                  Delivery : {product.details.delivery}
                </p>
                <p className="text-gray-600">
                  Payment : {product.details.payment}
                </p>
              </div>

              <Link to={`/product/${product.id}`} className="animationBtn block w-fit ms-auto">see more</Link>
            </div>
          </div>
        ))}
      </div>

      {/* الباجنيشن */}
      <Pagination
        totalPages={5}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default ProductsSide;
