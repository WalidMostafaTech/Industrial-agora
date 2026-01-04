import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ProductDeleteModal from "../modals/ProductDeleteModal";
import { formatLength, formatWeight } from "../../utils/formatFunctions";

const ProductCard = ({ product, dltBtn = false }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const { lang } = useParams();

  return (
    <div
      key={product.id}
      className="flex flex-col md:flex-row bg-stone-200/60 shadow-lg"
    >
      <div className="w-full md:w-[300px] max-h-[400px] aspect-square md:aspect-auto overflow-hidden bg-white relative">
        <img
          loading="lazy"
          src={product.first_image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {product.type !== "product" && (
          <p
            className={`absolute -top-4 -start-16 -rotate-45 rtl:rotate-45 text-white lg:text-lg font-semibold h-20 w-40 flex items-end justify-center p-2 z-10 ${
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
            condition: product.condition,
            delivery: product.delivery,
            payment: product.payment,
          }}
          t={t} // نمرر دالة الترجمة
        />

        {product.description && (
          <p className="text-gray-700 line-clamp-3">{product.description}</p>
        )}

        {dltBtn ? (
          <>
            {product.request_delete ? (
              <p className="block w-fit ms-auto text-sm bg-red-800 py-2 px-4 rounded-full text-white">
                {t("delete_request_sent")}
              </p>
            ) : (
              <button
                onClick={() => setOpenModal(true)}
                disabled={product.request_delete}
                className="animationBtn danger block w-fit ms-auto"
                style={{
                  opacity: product.request_delete ? 0.5 : 1,
                }}
              >
                {t("remove")}
              </button>
            )}
          </>
        ) : (
          <Link
            to={`/${lang}/product/${product.slug}`}
            className="animationBtn block w-fit ms-auto"
          >
            {t("seeMore")}
          </Link>
        )}
      </div>

      <ProductDeleteModal
        openModal={openModal}
        onClose={() => setOpenModal(false)}
        productId={product.id}
      />
    </div>
  );
};

export default ProductCard;

const AutoFields = ({ data, t }) => {
  if (!data || typeof data !== "object") return null;

  const formatValue = (key, value) => {
    if (["length", "width", "height"].includes(key)) {
      return formatLength(value, t);
    }

    if (key === "weight") {
      return formatWeight(value, t);
    }

    return value;
  };

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
            {t(`product.fields.${key}`)} : {formatValue(key, value)}
          </p>
        );
      })}
    </div>
  );
};
