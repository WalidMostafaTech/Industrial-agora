import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div
      key={product.id}
      className="flex flex-col md:flex-row items-center bg-stone-200 shadow-md"
    >
      <div className="w-full md:w-1/3 h-[300px] overflow-hidden bg-white relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />

        {product.badge && (
          <p
            className={`absolute -top-4 -start-13 -rotate-45 text-white lg:text-lg p-10 pb-2 z-10 ${
              product.badge === "required" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {product.badge}
          </p>
        )}
      </div>

      <div className="flex-1 space-y-4 p-4">
        <h4 className="text-lg font-bold line-clamp-2">{product.title}</h4>

        <div>
          <p className="text-gray-600">Status : {product.details.status}</p>
          <p className="text-gray-600">Type : {product.details.type}</p>
          <p className="text-gray-600">
            Condition : {product.details.condition}
          </p>
          <p className="text-gray-600">Delivery : {product.details.delivery}</p>
          <p className="text-gray-600">Payment : {product.details.payment}</p>
        </div>

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
