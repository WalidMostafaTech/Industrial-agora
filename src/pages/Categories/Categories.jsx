import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FilterSide from "./FilterSide";
import ProductsSide from "./ProductsSide";
import { RiMenu4Line } from "react-icons/ri";

const Categories = () => {
  const [openFilter, setOpenFilter] = useState(false);

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
          <div className="lg:sticky lg:top-32">
            <FilterSide />
          </div>
        </div>

        <ProductsSide />
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
            <FilterSide />
          </div>

          {/* Overlay يضغط عليه يقفل الفلتر */}
          <div className="flex-1" onClick={() => setOpenFilter(false)}></div>
        </div>
      )}
    </article>
  );
};

export default Categories;
