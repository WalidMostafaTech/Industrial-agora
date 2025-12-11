import { useParams } from "react-router-dom";
import { useState } from "react";
import SendMsgModal from "../../components/modals/SendMsgModal";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../services/productServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useSelector } from "react-redux";
import useHasPermission from "../../hooks/useHasPermission";
import { PERMISSIONS } from "../../permissions";
import { useTranslation } from "react-i18next";

const Product = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { profile } = useSelector((state) => state.profile);

  const canChat = useHasPermission(PERMISSIONS.CHAT_MEMBERS);

  const [openMsg, setOpenMsg] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });

  if (isLoading) return <LoadingPage />;
  if (isError || !product)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h3 className="text-2xl font-bold">{t("product.notFound")}</h3>
      </div>
    );

  const tags = ["Hydraulcs", "Hydraclcs", "PUMP"];

  return (
    <article className="container pagePadding space-y-6 lg:space-y-12">
      <section className="whiteContainer">
        <div className="flex flex-col md:flex-row gap-4 lg:gap-12">
          <div className="w-full md:w-1/3 h-[300px] md:h-[250px] xl:h-[300px] overflow-hidden">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-lg lg:text-2xl font-bold">{product?.name}</h2>

            <AutoFields
              data={{
                manufacturers: product.manufacturers,
                sku: product.sku,
                vendor: product.vendor,
                warehouse: product.warehouse,
              }}
              t={t}
            />

            <AutoFields
              data={{
                length: product.length,
                width: product.width,
                height: product.height,
                weight: product.weight,
              }}
              t={t}
            />

            {product?.price && (
              <p className="text-myBlue-2 text-lg font-bold">
                {product?.price} $
              </p>
            )}

            <AutoFields
              data={{
                status: product.status,
                condition: product.condition,
                delivery: product.delivery,
                payment: product.payment,
              }}
              t={t}
            />

            {product?.quantity ? (
              <p className="border-b border-stone-300 flex justify-end">
                <span className="bg-stone-200 py-1 px-2 text-sm">
                  {product?.quantity} {t("product.inStock")}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        {canChat && product?.seller_id !== profile?.id && (
          <button
            onClick={() => setOpenMsg(true)}
            className="animationBtn block mx-auto mt-8"
          >
            {t("product.contactSeller")}
          </button>
        )}
      </section>

      <div className="whiteContainer relative max-w-2xl mx-auto mt-16 lg:mt-24 flex flex-wrap justify-center gap-1">
        <h3
          className="text-xl lg:text-2xl text-myBlue-2 font-bold border-b-3 border-myBlue-2 
          absolute bottom-full left-1/2 -translate-x-1/2"
        >
          {t("product.tags")}
        </h3>

        {product?.tags?.length > 0 ? (
          product?.tags?.map((tag, index) => (
            <span key={index} className="text-stone-500 text-lg font-semibold">
              {tag}
              {tags.length - 1 !== index && ","}
            </span>
          ))
        ) : (
          <span className="text-stone-500 text-lg font-semibold">
            {t("product.noTags")}
          </span>
        )}
      </div>

      <SendMsgModal
        openModal={openMsg}
        onClose={() => setOpenMsg(false)}
        productId={product?.id}
      />
    </article>
  );
};

export default Product;

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
            {t(`product.fields.${key}`)} : {value}
          </p>
        );
      })}
    </div>
  );
};
