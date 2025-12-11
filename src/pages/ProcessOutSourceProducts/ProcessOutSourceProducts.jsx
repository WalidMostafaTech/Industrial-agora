import { useQuery } from "@tanstack/react-query";
import { getProductsOutSource } from "../../services/productServices";
import PageTitle from "../../components/common/PageTitle";
import { useSearchParams } from "react-router-dom";
import ProductCardList from "../../components/common/ProductCardList";
import Pagination from "../../components/common/Pagination";
import LoadingPage from "../../components/Loading/LoadingPage";
import { useTranslation } from "react-i18next";
import useHasPermission from "../../hooks/useHasPermission";
import { PERMISSIONS } from "../../permissions";
import PermissionSection from "../../components/sections/PermissionSection";

const ProcessOutSourceProducts = () => {
  const canShowProcessOutSourceProducts = useHasPermission(
    PERMISSIONS.VIEW_PROCESS_OUTSOURCE_PRODUCTS
  );

  if (!canShowProcessOutSourceProducts) return <PermissionSection />;

  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  // 📄 تحديد الصفحة الحالية من الـ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  // 🌀 جلب البيانات مع تمرير الصفحة
  const { data, isLoading } = useQuery({
    queryKey: ["productsOutSource", currentPage], // ⬅️ خلي الصفحة جزء من الـ key
    queryFn: () => getProductsOutSource(currentPage), // ⬅️ مرّر الصفحة للفنكشن
    keepPreviousData: true, // 🔁 يحافظ على البيانات القديمة أثناء تحميل الصفحة الجديدة
  });

  // 📄 تغيير الصفحة في الـ URL
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <section className="container pagePadding">
      <PageTitle title={t("processOutsource")} />

      <div className="max-w-3xl mx-auto space-y-6">
        <ProductCardList ProductsList={data?.items || []} />

        <Pagination
          totalPages={data?.meta?.last_page}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ProcessOutSourceProducts;
