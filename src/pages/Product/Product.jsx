import { useParams } from "react-router-dom";
import { useState } from "react";
import SendMsgModal from "../../components/modals/SendMsgModal";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../services/productServices";
import LoadingPage from "../../components/Loading/LoadingPage";
import EmptySection from "../../components/sections/EmptySection";
import { useSelector } from "react-redux";

const Product = () => {
  const { id } = useParams();
  const { profile } = useSelector((state) => state.profile);

  const [openMsg, setOpenMsg] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id, // يتفعل فقط لما يكون في id
  });

  if (isLoading) return <LoadingPage />;
  if (isError || !product)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h3 className="text-2xl font-bold">Product Not Found</h3>
      </div>
    );

  return (
    <article className="container pagePadding space-y-6 lg:space-y-12">
      <section className="whiteContainer">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 h-[300px] overflow-hidden">
            <img
              src={product?.images[0]}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-4">
            <h2 className="text-lg lg:text-3xl font-bold">{product?.name}</h2>

            <div className="space-y-1 text-gray-700">
              <p>Length : {product?.length}</p>
              <p>Width : {product?.width}</p>
              <p>Height : {product?.height}</p>
              <p>Weight : {product?.weight}</p>
            </div>

            <p className="text-myBlue-2 text-lg font-bold">
              {product?.price} $
            </p>

            {product?.quantity && (
              <p className="border-b border-gray-300 flex justify-end">
                <span className="bg-gray-200 py-1 px-2">
                  {product?.quantity} IN STOCK
                </span>
              </p>
            )}
          </div>
        </div>

        {product?.seller_id !== profile?.id && (
          <button
            onClick={() => setOpenMsg(true)}
            className="animationBtn block mx-auto mt-8"
          >
            contact with seller
          </button>
        )}
      </section>

      {/* <ProductsForms /> */}

      {/* <div className="whiteContainer relative max-w-3xl mx-auto mt-16 flex flex-wrap justify-center gap-1">
        <h3
          className="text-xl lg:text-3xl text-myBlue-2 font-bold border-b-3 border-myBlue-2 
        absolute bottom-full left-1/2 -translate-x-1/2"
        >
          PRODUCT TAGS
        </h3>

        {product?.tags.map((tag, index) => (
          <span key={index} className="text-gray-500 text-lg font-semibold">
            {tag}
            {product?.tags.length - 1 !== index && ","}
          </span>
        ))}
      </div> */}

      <SendMsgModal
        openModal={openMsg}
        onClose={() => setOpenMsg(false)}
        productId={product?.id}
      />
    </article>
  );
};

export default Product;
