import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";

import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import ImageUploader from "../../components/form/ImageUploader";
import { addProductApi } from "../../services/productServices";
import { useSelector } from "react-redux";
import SuccessModal from "../../components/modals/SuccessModal";

// ✅ Validation Schema
const schema = yup.object({
  name: yup.string().required("Product name is required"),
  category_id: yup.string().required("Category is required"),

  // 🟢 Existing fields
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer")
    .required("Quantity is required"),

  description: yup.string().required("Description is required"),

  // 🟢 Optional numeric fields
  length: yup
    .number()
    .typeError("Length must be a number")
    .positive("Length must be positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),

  width: yup
    .number()
    .typeError("Width must be a number")
    .positive("Width must be positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),

  height: yup
    .number()
    .typeError("Height must be a number")
    .positive("Height must be positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),

  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),

  accept_privacy_policy: yup
    .bool()
    .oneOf([true], "You must accept the privacy policy"),

  // 🟢 NEW FIELDS — all optional
  product_status: yup.string().nullable(),
  type: yup.string().nullable(),
  condition: yup.string().nullable(),
  delivery: yup.string().nullable(),
  payment: yup.string().nullable(),
  location: yup.string().nullable(),
  for_equipments: yup.string().nullable(),
  manufacturers: yup.string().nullable(),
  sku: yup.string().nullable(),
  vendor: yup.string().nullable(),
  warehouse: yup.string().nullable(),
});

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: addProductApi,
    onSuccess: () => {
      setImages([]);
      reset();
      setOpenModal(true);
    },
    onError: (error) => {
      console.error("❌ Failed to add product: " + error.message);
    },
  });

  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError("Please upload at least one product image.");
      return;
    }

    setImageError("");

    const formData = new FormData();

    // 🟢 Convert boolean to number
    const formattedData = {
      ...data,
      accept_privacy_policy: data.accept_privacy_policy ? 1 : 0,
    };

    // 🟢 Add all fields automatically
    Object.entries(formattedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    formData.append("type", "product");

    // 🟢 Add images correctly
    images.forEach((img, index) => {
      formData.append(`images[${index}]`, img.file);
    });

    mutate(formData);
  };

  const { categories } = useSelector((state) => state.categories);
  const categoriesOptions = categories?.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  return (
    <section className="container pagePadding">
      <PageTitle title="Start Selling" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="whiteContainer space-y-6 max-w-xl mx-auto"
      >
        <FormTitle
          title="Add a Product"
          subtitle="Product Data - Please fill in the details accurately"
        />

        {/* Product Name */}
        <MainInput
          label="Product name"
          id="name"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* Category */}
        <MainInput
          id="category_id"
          type="select"
          options={[
            { value: "", label: "Select Category" },
            ...categoriesOptions,
          ]}
          {...register("category_id")}
          error={errors.category_id?.message}
        />

        {/* Price */}
        <MainInput
          label="Price"
          id="price"
          type="number"
          {...register("price")}
          error={errors.price?.message}
        />

        {/* Quantity */}
        <MainInput
          label="Available quantity (stock)"
          id="quantity"
          type="number"
          {...register("quantity")}
          error={errors.quantity?.message}
        />

        {/* NEW TEXT FIELDS */}

        <MainInput
          label="Status"
          id="product_status"
          type="text"
          {...register("product_status")}
          error={errors.product_status?.message}
        />

        <MainInput
          label="Type"
          id="type"
          type="text"
          {...register("type")}
          error={errors.type?.message}
        />

        <MainInput
          label="Condition"
          id="condition"
          type="text"
          {...register("condition")}
          error={errors.condition?.message}
        />

        <MainInput
          label="Delivery"
          id="delivery"
          type="text"
          {...register("delivery")}
          error={errors.delivery?.message}
        />

        <MainInput
          label="Payment"
          id="payment"
          type="text"
          {...register("payment")}
          error={errors.payment?.message}
        />

        <MainInput
          label="Location"
          id="location"
          type="text"
          {...register("location")}
          error={errors.location?.message}
        />

        <MainInput
          label="For Equipments"
          id="for_equipments"
          type="text"
          {...register("for_equipments")}
          error={errors.for_equipments?.message}
        />

        <MainInput
          label="Manufacturers"
          id="manufacturers"
          type="text"
          {...register("manufacturers")}
          error={errors.manufacturers?.message}
        />

        <MainInput
          label="SKU"
          id="sku"
          type="text"
          {...register("sku")}
          error={errors.sku?.message}
        />

        <MainInput
          label="Vendor"
          id="vendor"
          type="text"
          {...register("vendor")}
          error={errors.vendor?.message}
        />

        <MainInput
          label="Warehouse"
          id="warehouse"
          type="text"
          {...register("warehouse")}
          error={errors.warehouse?.message}
        />

        {/* Dimensions */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="font-medium text-gray-900 col-span-2 lg:col-span-3">
            Product Dimensions (if required):
          </p>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="length"
              className="font-medium text-gray-900 text-sm"
            >
              Length:
            </label>
            <input
              type="number"
              id="length"
              {...register("length")}
              className="w-full bg-white outline-none border-none p-2 text-sm rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
            {errors.length && (
              <p className="text-red-700 text-sm">{errors.length.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="width"
              className="font-medium text-gray-900 text-sm"
            >
              Width:
            </label>
            <input
              type="number"
              id="width"
              {...register("width")}
              className="w-full bg-white outline-none border-none p-2 text-sm rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
            {errors.width && (
              <p className="text-red-700 text-sm">{errors.width.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="height"
              className="font-medium text-gray-900 text-sm"
            >
              Height:
            </label>
            <input
              type="number"
              id="height"
              {...register("height")}
              className="w-full bg-white outline-none border-none p-2 text-sm rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
            />
            {errors.height && (
              <p className="text-red-700 text-sm">{errors.height.message}</p>
            )}
          </div>
        </div>

        {/* Weight */}
        <MainInput
          label="Weight (if required)"
          id="weight"
          type="number"
          {...register("weight")}
          error={errors.weight?.message}
        />

        {/* Images */}
        <ImageUploader
          label="Product Images"
          onChange={setImages}
          error={imageError}
          initialImages={images}
        />

        {/* Description */}
        <MainInput
          label="Product Description"
          id="description"
          type="textarea"
          {...register("description")}
          error={errors.description?.message}
        />

        {/* Privacy Policy */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-neutral checkbox-xs"
              {...register("accept_privacy_policy")}
            />
            <span className="label-text text-gray-700 text-sm">
              Accept privacy policy
            </span>
          </label>
          {errors.accept_privacy_policy && (
            <p className="text-red-700 text-sm mt-1">
              {errors.accept_privacy_policy.message}
            </p>
          )}
        </div>

        <FormError errorMsg={error?.response?.data?.message} />
        <FormBtn title="Submit" loading={isPending} disabled={isPending} />
      </form>

      <SuccessModal
        openModal={openModal}
        msg="Product added successfully!"
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
      />
    </section>
  );
};

export default AddProduct;
