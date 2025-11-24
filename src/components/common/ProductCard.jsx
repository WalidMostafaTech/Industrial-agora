import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div
      key={product.id}
      className="flex flex-col md:flex-row bg-stone-200/60 shadow-lg"
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
              product.type === "outsource" ? "bg-red-700" : "bg-green-600"
            }`}
          >
            {product.type === "outsource" ? t("request") : t("offered")}
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4 p-4">
        <h4 className="text-lg font-bold line-clamp-2">{product.name}</h4>

        <AutoFields
          data={{
            status: product.status,
            type: product.type,
            condition: product.condition,
            delivery: product.delivery,
            payment: product.payment,
          }}
          t={t} // نمرر دالة الترجمة
        />

        {product.description && (
          <p className="text-gray-700 line-clamp-3">{product.description}</p>
        )}

        <Link
          to={`/product/${product.id}`}
          className="animationBtn block w-fit ms-auto"
        >
          {t("seeMore")}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

const AutoFields = ({ data, t }) => {
  if (!data || typeof data !== "object") return null;

  return (
    <div className="space-y-1">
      {Object.entries(data).map(([key, value]) => {
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return null;
        }

        return (
          <p key={key} className="text-gray-700">
            {t(key.charAt(0).toUpperCase() + key.slice(1))} : {value}
          </p>
        );
      })}
    </div>
  );
};
