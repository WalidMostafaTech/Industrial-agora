import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { LuChevronDown } from "react-icons/lu";

const CategoriesList = [
  {
    id: 1,
    title: "Category 1",
    key: "category-1",
    items: [
      { id: 10, title: "Sub Category 1" },
      { id: 20, title: "Sub Category 2" },
    ],
  },
  {
    id: 2,
    title: "Category 2",
    key: "category-2",
    items: [
      { id: 100, title: "Sub Category 1" },
      { id: 200, title: "Sub Category 2" },
    ],
  },
];

const filterList = [
  {
    id: 1,
    label: "In Stock",
    key: "in-stock",
    items: [{ id: 1, name: "In Stock" }],
  },
  {
    id: 2,
    label: "Manufacturer",
    key: "manufacturer",
    items: [
      { id: 1, name: "Rica - Zoppas" },
      { id: 2, name: "Volve" },
      { id: 3, name: "Bomag" },
      { id: 4, name: "Atli" },
    ],
  },
  {
    id: 3,
    label: "Color",
    key: "color",
    items: [
      { id: 1, name: "red" },
      { id: 2, name: "blue" },
      { id: 3, name: "green" },
      { id: 4, name: "yellow" },
    ],
  },
];

const FilterSide = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategoryId, setOpenCategoryId] = useState(null);

  // ✅ اقرأ من URL عند التحميل
  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      const foundCat = CategoriesList.find((c) => c.key === categoryFromURL);
      if (foundCat) setOpenCategoryId(foundCat.id);
    }
  }, [searchParams]);

  // ✅ إضافة / إزالة فلتر في URL
  const toggleFilter = (filterKey, value) => {
    const newParams = new URLSearchParams(searchParams);
    const existingValues = newParams.getAll(`${filterKey}[]`);

    if (existingValues.includes(String(value))) {
      // إزالة القيمة
      const updatedValues = existingValues.filter((v) => v !== String(value));
      newParams.delete(`${filterKey}[]`);
      // eslint-disable-next-line no-unused-vars
      updatedValues.forEach((v, i) => newParams.append(`${filterKey}[]`, v));
    } else {
      // إضافة القيمة
      newParams.append(`${filterKey}[]`, value);
    }

    newParams.set("page", 1); // رجع للصفحة الأولى
    setSearchParams(newParams);
  };

  const handleSelectCategory = (category) => {
    const newParams = new URLSearchParams();

    // ✨ نضيف الكاتيجوري الجديد فقط ونفضي أي فلتر أو سب كاتيجوري
    newParams.set("category", category.key);
    newParams.set("page", 1);

    setSearchParams(newParams);
    setOpenCategoryId(category.id);
  };

  // ✅ اختيار سب كاتيجوري
  const handleSelectSubCategory = (subCat) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("subcategory", subCat.id);
    newParams.set("page", 1);
    setSearchParams(newParams);
  };

  // ✅ نبني array للـ API
  const filtersArray = {};
  for (const [key, value] of searchParams.entries()) {
    if (key.endsWith("[]")) {
      const cleanKey = key.replace("[]", "");
      if (!filtersArray[cleanKey]) filtersArray[cleanKey] = [];
      filtersArray[cleanKey].push(value);
    } else {
      filtersArray[key] = value;
    }
  }

  console.log("filtersArray to send to API:", filtersArray);

  const FilterTitle = ({ title }) => (
    <h3
      className="lg:text-lg font-bold uppercase mb-2 border-b border-gray-300 pb-1 relative
      after:content-[''] after:absolute after:-bottom-0.5 after:start-0 after:w-1/3 after:h-1 after:bg-myBlue-2"
    >
      {title}
    </h3>
  );

  return (
    <aside className="space-y-6">
      {/* FILTERS */}
      {filterList.map((filter) => (
        <div key={filter.id}>
          <FilterTitle title={filter.label} />
          {filter.items.map((item) => {
            const checked = searchParams
              .getAll(`${filter.key}[]`)
              .includes(String(item.id));
            return (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer mb-1"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={checked}
                  onChange={() => toggleFilter(filter.key, item.id)}
                />
                <span>{item.name}</span>
              </label>
            );
          })}
        </div>
      ))}

      {/* Categories */}
      <div>
        <FilterTitle title="Categories" />
        {CategoriesList.map((cat) => (
          <div key={cat.id}>
            <button
              className={`flex items-center justify-between w-full font-bold mb-1 cursor-pointer ${
                openCategoryId === cat.id ? "text-myBlue-2" : ""
              }`}
              onClick={() => handleSelectCategory(cat)}
            >
              <span>{cat.title}</span>
              <LuChevronDown
                className={`text-2xl duration-300 ${
                  openCategoryId === cat.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                openCategoryId === cat.id ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <ul className="space-y-1 ps-2">
                {cat.items.map((subCat) => (
                  <li
                    key={subCat.id}
                    onClick={() => handleSelectSubCategory(subCat)}
                    className={`font-semibold cursor-pointer duration-200 hover:text-black ${
                      searchParams.get("subcategory") === String(subCat.id)
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {subCat.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSide;
