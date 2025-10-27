import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="flex flex-col md:flex-row bg-stone-200 shadowlg"
    >
      <div className="w-full md:w-[300px] aspect-square md:aspect-auto overflow-hidden bg-white relative">
        <img
          src={product.first_image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.type !== "product" && (
          <p
            className={`absolute -top-4 -start-13 -rotate-45 text-white lg:text-lg font-semibold p-10 pb-2 z-10 ${
              product.type === "outsource" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {product.type === "outsource" ? "request" : "offered"}
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4 p-4">
        <h4 className="text-lg font-bold line-clamp-2">{product.name}</h4>

        {/* <div>
          <p className="text-gray-600">Status : {product.details.status}</p>
          <p className="text-gray-600">Type : {product.details.type}</p>
          <p className="text-gray-600">
            Condition : {product.details.condition}
          </p>
          <p className="text-gray-600">Delivery : {product.details.delivery}</p>
          <p className="text-gray-600">Payment : {product.details.payment}</p>
        </div> */}

        <p className="text-gray-600 line-clamp-3">{product.description}</p>

        <Link
          to={`/product/${product.id}`}
          className="animationBtn block w-fit ms-auto"
        >
          see more
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
