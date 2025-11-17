import { useQuery } from "@tanstack/react-query";
import { getProductsOutSource } from "../../services/productServices";
import PageTitle from "../../components/common/PageTitle";
import { useSearchParams } from "react-router-dom";
import ProductCardList from "../../components/common/ProductCardList";
import Pagination from "../../components/common/Pagination";

const ProcessOutSourceProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 📄 تحديد الصفحة الحالية من الـ URL
  const currentPage = Number(searchParams.get("page")) || 1;

  // 🌀 جلب البيانات مع تمرير الصفحة
  const { data, isLoading, isError, error } = useQuery({
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

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-700">Error: {error.message}</p>;


  return (
    <section className="container pagePadding">
      <PageTitle title="Process Outsource" />

      <div className="max-w-3xl mx-auto space-y-6">
        <ProductCardList ProductsList={data?.items || []} />

        <Pagination
          totalPages={data?.meta?.total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ProcessOutSourceProducts;
