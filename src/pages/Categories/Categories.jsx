import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import PageTitle from "../../components/common/PageTitle";
import FilterSide from "./FilterSide";
import ProductsSide from "./ProductsSide";
import { RiMenu4Line } from "react-icons/ri";

const Categories = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams();

  // ✅ اجمع الفلاتر كلها في object واحد
  const filters = {
    category: categorySlug,
    page: Number(searchParams.get("page")) || 1,
    inStock: searchParams.get("in-stock") === "1",
    subCategories: Array.from(searchParams.keys())
      .filter((k) => k.startsWith("subcategory["))
      .map((k) => searchParams.get(k)),
    manufacturers: Array.from(searchParams.keys())
      .filter((k) => k.startsWith("manufacturers["))
      .map((k) => searchParams.get(k)),
  };

  // ✅ function لتحديث أي param بسهولة
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    setSearchParams(params);
  };

  // ✅ function لتحديث array params زي subcategory[], manufacturers[]
  const updateArrayParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    const existing = Array.from(params.keys())
      .filter((k) => k.startsWith(`${key}[`))
      .map((k) => params.get(k));

    const set = new Set(existing);
    if (set.has(value)) set.delete(value);
    else set.add(value);

    Array.from(params.keys())
      .filter((k) => k.startsWith(`${key}[`))
      .forEach((k) => params.delete(k));

    Array.from(set).forEach((v, i) => {
      params.append(`${key}[${i}]`, v);
    });

    // كل ما اختار فلتر جديد نرجعه لأول صفحة
    params.set("page", 1);

    setSearchParams(params);
  };

  useEffect(() => {
    console.log("🔗 Filters to send API:", filters);
    // هنا تعمل Fetch API بناءً على filters
  }, [filters]);

  return (
    <article className="container pagePadding">
      <PageTitle title="Categories" />

      <button
        onClick={() => setOpenFilter(true)}
        className="mainBtn lg:!hidden mb-4"
      >
        Filters <RiMenu4Line />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 xl:gap-16">
        <div className="hidden lg:block">
          <FilterSide
            filters={filters}
            updateParam={updateParam}
            updateArrayParam={updateArrayParam}
          />
        </div>

        <ProductsSide filters={filters} updateParam={updateParam} />
      </div>

      {/* فلتر كـ Drawer للشاشات الصغيرة */}
      {openFilter && (
        <div className="fixed inset-0 bg-black/50 z-50 flex lg:hidden">
          <div className="bg-white w-72 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={() => setOpenFilter(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>
            <FilterSide
              filters={filters}
              updateParam={updateParam}
              updateArrayParam={updateArrayParam}
            />
          </div>

          {/* Overlay يضغط عليه يقفل الفلتر */}
          <div className="flex-1" onClick={() => setOpenFilter(false)}></div>
        </div>
      )}
    </article>
  );
};

export default Categories;
