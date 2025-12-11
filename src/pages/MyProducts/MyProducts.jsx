import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ProductCardList from "../../components/common/ProductCardList";
import Pagination from "../../components/common/Pagination";
import { getMyProducts } from "../../services/productServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import { useTranslation } from "react-i18next";
import { LuPlus } from "react-icons/lu";

const MyProducts = () => {
  const [active, setActive] = useState("1"); // 1 = Products , 0 = OutSource
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const currentPage = Number(searchParams.get("page")) || 1;

  const tabs = [
    { id: 1, title: t("products"), link: "1" },
    { id: 2, title: t("outSource"), link: "0" },
  ];

  // React Query
  const { data: products, isLoading } = useQuery({
    queryKey: ["my-products", active, currentPage],
    queryFn: () =>
      getMyProducts({
        page: currentPage,
        is_product: active,
      }),
    keepPreviousData: true,
  });

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  const handleTabChange = (tab) => {
    setActive(tab);
    setSearchParams({ page: 1 });
  };

  return (
    <section className="pagePadding container space-y-8">
      {/* 🔥 Tabs */}
      <hgroup className="text-center border-b border-gray-300 flex items-center justify-evenly w-full max-w-lg mx-auto">
        {tabs.map((t) => (
          <h3
            key={t.id}
            onClick={() => handleTabChange(t.link)}
            className={`text-sm md:text-xl font-bold border-b-3 pb-2 uppercase cursor-pointer translate-y-0.5 ${
              active === t.link
                ? "text-myBlue-2 border-myBlue-2"
                : "text-gray-400 border-transparent"
            }`}
          >
            {t.title}
          </h3>
        ))}
      </hgroup>

      {/* Loading State */}
      {isLoading && <LoadingSection />}

      {/* Product List */}
      {!isLoading && (
        <section>
          {active === "1" ? (
            <Link
              to={`/add-product`}
              className="mainBtn success w-fit me-auto mb-4"
            >
              {t("addProduct")} <LuPlus className="text-xl!" />
            </Link>
          ) : (
            <Link
              to={`/process-outsource/service`}
              className="mainBtn success w-fit me-auto mb-4"
            >
              {t("addProcess")} <LuPlus className="text-xl!" />
            </Link>
          )}

          <ProductCardList ProductsList={products?.items} dltBtn />
        </section>
      )}

      {/* Pagination */}
      <Pagination
        totalPages={products?.meta?.last_page}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default MyProducts;
