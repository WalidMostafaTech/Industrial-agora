import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import ImageUploader from "../../components/form/ImageUploader";
import SuccessModal from "../../components/modals/SuccessModal";
import useHasPermission from "../../hooks/useHasPermission";
import PermissionSection from "../../components/sections/PermissionSection";
import { addProductApi } from "../../services/productServices";
import { PERMISSIONS } from "../../permissions";

// ✅ Validation Schema
const schema = yup.object({
  name: yup.string().required("AddProduct.errors.name"),
  category_id: yup.string().required("AddProduct.errors.category_id"),
  price: yup
    .number()
    .typeError("AddProduct.errors.price_number")
    .positive("AddProduct.errors.price_positive")
    .required("AddProduct.errors.price_required"),
  quantity: yup
    .number()
    .typeError("AddProduct.errors.quantity_number")
    .positive("AddProduct.errors.quantity_positive")
    .integer("AddProduct.errors.quantity_integer")
    .required("AddProduct.errors.quantity_required"),
  description: yup.string().required("AddProduct.errors.description"),
  length: yup
    .number()
    .typeError("AddProduct.errors.length_number")
    .positive("AddProduct.errors.length_positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
  width: yup
    .number()
    .typeError("AddProduct.errors.width_number")
    .positive("AddProduct.errors.width_positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
  height: yup
    .number()
    .typeError("AddProduct.errors.height_number")
    .positive("AddProduct.errors.height_positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
  weight: yup
    .number()
    .typeError("AddProduct.errors.weight_number")
    .positive("AddProduct.errors.weight_positive")
    .nullable()
    .transform((v, o) => (o === "" ? null : v)),
  accept_privacy_policy: yup
    .bool()
    .oneOf([true], "AddProduct.errors.privacy_policy"),
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
  tags: yup.string().nullable(),
});

const AddProduct = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { categories } = useSelector((state) => state.categories);
  const categoriesOptions = categories?.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const canPost = useHasPermission(PERMISSIONS.POST_OUTSOURCE_AD);

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
    onError: (error) => console.error(error),
  });

  const onSubmit = (data) => {
    if (images.length === 0) {
      setImageError(t("AddProduct.errors.images_required"));
      return;
    }

    setImageError("");

    const formData = new FormData();
    const formattedData = {
      ...data,
      accept_privacy_policy: data.accept_privacy_policy ? 1 : 0,
    };

    Object.entries(formattedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value);
    });

    formData.append("type", "product");

    images.forEach((img, index) =>
      formData.append(`images[${index}]`, img.file)
    );

    mutate(formData);
  };

  if (!canPost) return <PermissionSection />;

  return (
    <section className="container pagePadding">
      <PageTitle title={t("AddProduct.pageTitle")} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="whiteContainer space-y-6 max-w-xl mx-auto"
      >
        <FormTitle
          title={t("AddProduct.formTitle")}
          subtitle={t("AddProduct.formSubtitle")}
        />

        <MainInput
          label={t("AddProduct.fields.name")}
          id="name"
          {...register("name")}
          error={t(errors.name?.message)}
        />

        <MainInput
          label={t("AddProduct.fields.category_id")}
          id="category_id"
          type="select"
          options={[
            { value: "", label: t("AddProduct.fields.category_id") },
            ...categoriesOptions,
          ]}
          {...register("category_id")}
          error={t(errors.category_id?.message)}
        />

        <MainInput
          label={t("AddProduct.fields.price")}
          id="price"
          type="number"
          {...register("price")}
          error={t(errors.price?.message)}
        />

        <MainInput
          label={t("AddProduct.fields.quantity")}
          id="quantity"
          type="number"
          {...register("quantity")}
          error={t(errors.quantity?.message)}
        />

        {/* باقي الحقول النصية */}
        {[
          "product_status",
          "type",
          "condition",
          "delivery",
          "payment",
          "location",
          "for_equipments",
          "manufacturers",
          "sku",
          "vendor",
          "warehouse",
        ].map((field) => (
          <MainInput
            key={field}
            label={t(`AddProduct.fields.${field}`)}
            id={field}
            type="text"
            {...register(field)}
            error={t(errors[field]?.message)}
          />
        ))}

        {/* Dimensions */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="font-medium text-gray-900 col-span-2 lg:col-span-3">
            {t("AddProduct.fields.length")} / {t("AddProduct.fields.width")} /{" "}
            {t("AddProduct.fields.height")}
          </p>
          {["length", "width", "height"].map((dim) => (
            <div key={dim} className="flex flex-col gap-1">
              <label
                htmlFor={dim}
                className="font-medium text-gray-900 text-sm"
              >
                {t(`AddProduct.fields.${dim}`)}
              </label>
              <input
                type="number"
                id={dim}
                {...register(dim)}
                className="w-full bg-white outline-none border-none p-2 text-sm rounded-md ring-1 ring-gray-400 focus-within:ring-myBlue-2"
              />
              {errors[dim] && (
                <p className="text-red-700 text-sm">{t(errors[dim].message)}</p>
              )}
            </div>
          ))}
        </div>

        <MainInput
          label={t("AddProduct.fields.weight")}
          id="weight"
          type="number"
          {...register("weight")}
          error={t(errors.weight?.message)}
        />

        <ImageUploader
          label={t("AddProduct.fields.images")}
          onChange={setImages}
          error={imageError}
          initialImages={images}
        />

        <MainInput
          label={t("AddProduct.fields.tags")}
          placeholder={t("AddProduct.fields.tags_placeholder")}
          id="tags"
          {...register("tags")}
          error={t(errors.tags?.message)}
        />

        <MainInput
          label={t("AddProduct.fields.description")}
          id="description"
          type="textarea"
          {...register("description")}
          error={t(errors.description?.message)}
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
              {t("AddProduct.fields.accept_privacy_policy")}
            </span>
          </label>
          {errors.accept_privacy_policy && (
            <p className="text-red-700 text-sm mt-1">
              {t(errors.accept_privacy_policy.message)}
            </p>
          )}
        </div>

        <FormError errorMsg={error?.response?.data?.message} />
        <FormBtn
          title={t("AddProduct.submitBtn")}
          loading={isPending}
          disabled={isPending}
        />
      </form>

      <SuccessModal
        openModal={openModal}
        msg={t("AddProduct.successMsg")}
        onClose={() => setOpenModal(false)}
        onConfirm={() => setOpenModal(false)}
      />
    </section>
  );
};

export default AddProduct;
