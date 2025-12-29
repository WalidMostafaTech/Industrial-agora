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
import { useTranslation } from "react-i18next";
import { setPageSeo } from "../../services/mainServices";
import SeoManager from "../../utils/SeoManager";

const Categories = () => {
  const { t } = useTranslation();
  const [openFilter, setOpenFilter] = useState(false);
  let showFilter = false;

  const { slug } = useParams();

  const { data: category } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategoryDetails(slug),
    enabled: !!slug && slug !== "all",
  });

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products-by-category", slug, currentPage],
    queryFn: () => getProductsByCategory(slug, currentPage),
    enabled: !!slug,
  });

  const { data: seoData } = useQuery({
    queryKey: ["seoData"],
    queryFn: () => setPageSeo({ page: "category", slug }),
  });

  return (
    <>
      <SeoManager
        title={seoData?.meta_title}
        description={seoData?.meta_description}
        keywords={seoData?.keywords}
        canonical={seoData?.canonical_url}
        ogImage={seoData?.og_image_url}
      />

      <article className="container pagePadding">
        <PageTitle title={t("categories")} />

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
    </>
  );
};

export default Categories;
