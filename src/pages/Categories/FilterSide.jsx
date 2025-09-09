import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

const CategoriesList = [
  {
    id: 1,
    title: "Category 1",
    slug: "category-1",
    subCategories: [
      { id: 10, title: "Sub Category 1" },
      { id: 20, title: "Sub Category 2" },
    ],
  },
  {
    id: 2,
    title: "Category 2",
    slug: "category-2",
    subCategories: [
      { id: 100, title: "Sub Category 1" },
      { id: 200, title: "Sub Category 2" },
    ],
  },
];

const manufacturersList = [
  { id: 1, name: "Rica - Zoppas" },
  { id: 2, name: "Volve" },
  { id: 3, name: "Bomag" },
  { id: 4, name: "Atli" },
];

const FilterSide = () => {
  const navigate = useNavigate();
  const { slug } = useParams(); // ✅ هنا استخدمنا نفس اسم الـ param اللي في الـ route
  const [searchParams, setSearchParams] = useSearchParams();

  const [openCategoryId, setOpenCategoryId] = useState(null);

  // افتح الكاتيجوري اللي في الـ URL عند أول تحميل
  useEffect(() => {
    if (slug) {
      const currentCat = CategoriesList.find((c) => c.slug === slug);
      if (currentCat) {
        setOpenCategoryId(currentCat.id);
      }
    }
  }, [slug]);

  const inStock = searchParams.get("in-stock") === "1";

  // هنا هنخلي subcategory قيمة واحدة بس مش array
  const selectedSubCategory = searchParams.get("subcategory");

  const manufacturers = Array.from(searchParams.keys())
    .filter((k) => k.startsWith("manufacturers["))
    .map((k) => searchParams.get(k));

  const currentCategory = CategoriesList.find((c) => c.slug === slug);

  const updateFilterSingle = (key, value) => {
    const params = new URLSearchParams(searchParams);

    // لو بنتعامل مع subcategory نحذف أي قيمة قديمة ونضيف الجديدة
    if (key === "subcategory") {
      Array.from(params.keys())
        .filter((k) => k.startsWith("subcategory"))
        .forEach((k) => params.delete(k));
    }

    if (value === null) params.delete(key);
    else params.set(key, value);

    setSearchParams(params);
  };

  const updateFilterArray = (key, value) => {
    const params = new URLSearchParams(searchParams);
    const existingValues = Array.from(params.keys())
      .filter((k) => k.startsWith(`${key}[`))
      .map((k) => params.get(k));

    const valuesSet = new Set(existingValues);

    if (valuesSet.has(value)) valuesSet.delete(value);
    else valuesSet.add(value);

    Array.from(params.keys())
      .filter((k) => k.startsWith(`${key}[`))
      .forEach((k) => params.delete(k));

    Array.from(valuesSet).forEach((v, i) => {
      params.append(`${key}[${i}]`, v);
    });

    setSearchParams(params);
  };

  const handleSelectCategory = (category) => {
    if (category.slug !== slug) {
      navigate(`/categories/${category.slug}`);
    }
    setOpenCategoryId(category.id);
  };

  // 🟢 لوج للداتا اللي هتتبعت للـ API
  useEffect(() => {
    console.log("🔗 Filters to send API:", {
      category: currentCategory?.id,
      subCategory: selectedSubCategory,
      manufacturers,
      inStock,
    });
  }, [currentCategory, selectedSubCategory, manufacturers, inStock]);

  const FilterTitle = ({ title }) => (
    <h3
      className="lg:text-lg font-bold mb-2 border-b border-gray-300 pb-1 relative
      after:content-[''] after:absolute after:-bottom-0.5 after:start-0 after:w-1/3 after:h-1 after:bg-myBlue-2"
    >
      {title}
    </h3>
  );

  return (
    <aside className="space-y-6">
      {/* IN STOCK */}
      <div>
        <FilterTitle title="IN STOCK" />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={inStock}
            onChange={() =>
              updateFilterSingle("in-stock", inStock ? null : "1")
            }
          />
          <span>In Stock</span>
        </label>
      </div>

      {/* Manufacturers */}
      <div>
        <FilterTitle title="MANUFACTURERS" />
        {manufacturersList.map((m) => (
          <label
            key={m.id}
            className="flex items-center gap-2 cursor-pointer mb-1"
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={manufacturers.includes(String(m.id))}
              onChange={() => updateFilterArray("manufacturers", String(m.id))}
            />
            <span>{m.name}</span>
          </label>
        ))}
      </div>

      {/* Categories */}
      <div>
        <FilterTitle title="CATEGORIES" />
        {CategoriesList.map((cat) => (
          <div key={cat.id}>
            <button
              className={`flex items-center justify-between w-full font-semibold mb-1 cursor-pointer ${
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

            {openCategoryId === cat.id && (
              <div className="overflow-hidden transition-all duration-500 max-h-[500px]">
                <ul className="space-y-1 ps-2">
                  {cat.subCategories.map((subCat) => (
                    <li key={subCat.id}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio" // ✅ خليه اختيار واحد فقط
                          name={`subcategory-${cat.id}`} // ✅ نفس الـ name عشان يشتغل زي الـ radio group
                          className="w-4 h-4"
                          checked={selectedSubCategory === String(subCat.id)}
                          onChange={() =>
                            updateFilterSingle("subcategory", String(subCat.id))
                          }
                        />
                        <span className="text-gray-600 hover:text-black font-semibold cursor-pointer duration-200">
                          {subCat.title}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default FilterSide;
