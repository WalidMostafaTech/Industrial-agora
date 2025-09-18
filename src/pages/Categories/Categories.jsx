import { useState } from "react";
import PageTitle from "../../components/common/PageTitle";
import FilterSide from "./FilterSide";
import ProductsSide from "./ProductsSide";
import { RiMenu4Line } from "react-icons/ri";

const Categories = () => {
  const [openFilter, setOpenFilter] = useState(false);
  let showFilter = false;

  return (
    <article className="container pagePadding">
      <PageTitle title="Categories" />

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

        <div className={`${!showFilter ? "max-w-6xl" : "w-full"}`}>
          <ProductsSide />
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
          <div className="flex-1" onClick={() => setOpenFilter(false)}></div>
        </div>
      )}
    </article>
  );
};

export default Categories;
