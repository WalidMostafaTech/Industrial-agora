import { useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";
import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";

const AddProduct = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <section className="container pagePadding">
      <PageTitle title="start selling" />

      <form className="whiteContainer space-y-6 max-w-3xl mx-auto">
        <FormTitle
          title="Add a Product"
          subtitle="Product Data - Please fill in the details accurately"
        />

        <MainInput label="product name" id="product_name" />

        <MainInput
          label="Category/Classification"
          id="category_classification"
          type="select"
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ]}
        />

        <MainInput label="the price" id="price" type="number" />

        <MainInput
          label="Available quantity (stock)"
          id="quantity"
          type="number"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="font-medium text-gray-900 col-span-2 lg:col-span-3">
            Product Dimensions (if required):
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="length" className="font-medium text-gray-900">
              Length:
            </label>
            <input
              type="number"
              id="length"
              className="w-full lg:text-lg bg-white outline-none border-none p-3 rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="width" className="font-medium text-gray-900">
              Width:
            </label>
            <input
              type="number"
              id="width"
              className="w-full lg:text-lg bg-white outline-none border-none p-3 rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="height" className="font-medium text-gray-900">
              Height:
            </label>
            <input
              type="number"
              id="height"
              className="w-full lg:text-lg bg-white outline-none border-none p-3 rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
          </div>
        </div>

        <MainInput label="Weight (if required)" id="weight" type="number" />

        {/* Product Image Field */}
        <div>
          <p className="font-medium text-gray-900 mb-2">Product Image:</p>

          {!image ? (
            <label
              htmlFor="product_image"
              className="w-40 h-40 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-myBlue-2 hover:bg-gray-50 transition"
            >
              <FiCamera className="text-3xl text-gray-500" />
              <span className="text-gray-500 text-sm">Upload Image</span>
              <input
                id="product_image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <div className="relative w-40 h-40">
              <img
                src={image}
                alt="Product preview"
                className="w-full h-full object-cover rounded-xl border border-myBlue-2"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-500 cursor-pointer"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          )}
        </div>

        <MainInput
          label="Product Description"
          id="product_description"
          type="textarea"
        />

        <div className="flex items-center">
          <input
            id="privacy_policy"
            name="privacy_policy"
            type="checkbox"
            className="h-4 w-4 text-myBlue-1 focus:ring-myBlue-1 border-gray-300 rounded"
          />
          <label htmlFor="privacy_policy" className="ms-2 block text-gray-600">
            accept privacy policy
          </label>
        </div>

        <FormBtn title="Submit" />
      </form>
    </section>
  );
};

export default AddProduct;
