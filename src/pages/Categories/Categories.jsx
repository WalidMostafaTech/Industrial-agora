import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FilterSide from "./FilterSide";
import ProductsSide from "./ProductsSide";
import { RiMenu4Line } from "react-icons/ri";
import { useParams, useSearchParams } from "react-router-dom";
import {
  getCategoryDetails,
  getProductsByCategory,
} from "../../services/productServices";
import { useQuery } from "@tanstack/react-query";
import LoadingSection from "../../components/Loading/LoadingSection";

const Categories = () => {
  const [openFilter, setOpenFilter] = useState(false);
  let showFilter = false;

  const { id } = useParams();

  const { data: category } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryDetails(id),
    enabled: !!id, // يتفعل فقط لما يكون في id
  });

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products-by-category", id, currentPage],
    queryFn: () => getProductsByCategory(id, currentPage),
    enabled: !!id, // يتفعل فقط لما يكون في id
  });

  return (
    <article className="container pagePadding">
      <PageTitle title="Categories" />

      {productsLoading ? (
        <LoadingSection />
      ) : (
        <>
          {showFilter && (
            <button
              onClick={() => setOpenFilter(true)}
              className="mainBtn xl:!hidden mb-4"
            >
              Filters <RiMenu4Line />
            </button>
          )}
          <div className="flex gap-12 justify-center">
            {showFilter && (
              <div className="hidden xl:block">
                <div className="xl:sticky xl:top-32">
                  <FilterSide />
                </div>
              </div>
            )}

            <div className={`w-full ${!showFilter ? "max-w-5xl" : ""}`}>
              <ProductsSide products={products} category={category} />
            </div>
          </div>
          {/* فلتر كـ Drawer للشاشات الصغيرة */}
          {showFilter && openFilter && (
            <div className="fixed inset-0 bg-black/50 z-50 flex xl:hidden">
              <div className="bg-white p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button
                    onClick={() => setOpenFilter(false)}
                    className="text-gray-600 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
                <FilterSide />
              </div>

              {/* Overlay يضغط عليه يقفل الفلتر */}
              <div
                className="flex-1"
                onClick={() => setOpenFilter(false)}
              ></div>
            </div>
          )}
        </>
      )}
    </article>
  );
};

export default Categories;
