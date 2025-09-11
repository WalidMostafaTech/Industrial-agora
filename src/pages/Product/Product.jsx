import { useParams } from "react-router-dom";
import productImg from "../../assets/images/product-img.png";
import ProductsForms from "./ProductsForms/ProductsForms";

const Product = () => {
  const { id } = useParams();
  const product = {
    id,
    title:
      "A11VLO190LRDU2/11R-NZD12K02P-S HYDRAULIC PUMP ZL1010000094 ZOOM LION",
    details: {
      status: "Brand New ZL1010000094",
      type: "Concrete pump Spare Parts",
      condition: "Original Packing",
      delivery: "From stock",
      payment: "Advance",
    },
    tags: ["Hydraulcs", "Hydraclcs", "PUMP"],
    image: productImg,
  };

  return (
    <article className="container pagePadding space-y-6 lg:space-y-12">
      <section className="flex flex-col md:flex-row whiteContainer">
        <div className="w-full md:w-1/3 h-[300px] overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">
          <h2 className="text-lg lg:text-3xl font-bold">{product.title}</h2>

          <div>
            <p className="text-gray-600">Status : {product.details.status}</p>
            <p className="text-gray-600">Type : {product.details.type}</p>
            <p className="text-gray-600">
              Condition : {product.details.condition}
            </p>
            <p className="text-gray-600">
              Delivery : {product.details.delivery}
            </p>
            <p className="text-gray-600">Payment : {product.details.payment}</p>
          </div>

          <p className="text-myBlue-2 text-lg font-bold">$4,310.64 excl tax</p>

          <div>
            <p className="text-gray-600">Status : {product.details.status}</p>
            <p className="text-gray-600">Type : {product.details.type}</p>
            <p className="text-gray-600">
              Condition : {product.details.condition}
            </p>
            <p className="text-gray-600">
              Delivery : {product.details.delivery}
            </p>
            <p className="text-gray-600">Payment : {product.details.payment}</p>
          </div>

          <p className="border-b border-gray-300 flex justify-end">
            <span className="bg-gray-200 py-1 px-2">1 IN STOCK</span>
          </p>
        </div>
      </section>

      <ProductsForms />

      <div className="whiteContainer relative max-w-3xl mx-auto mt-16 flex flex-wrap justify-center gap-1">
        <h3
          className="text-xl lg:text-3xl text-myBlue-2 font-bold border-b-3 border-myBlue-2 
        absolute bottom-full left-1/2 -translate-x-1/2"
        >
          PRODUCT TAGS
        </h3>

        {product.tags.map((tag, index) => (
          <span key={index} className="text-gray-500 text-lg font-semibold">
            {tag}
            {product.tags.length - 1 !== index && ","}
          </span>
        ))}
      </div>
    </article>
  );
};

export default Product;
