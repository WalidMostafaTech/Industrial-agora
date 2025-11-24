import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import PageTitle from "../../components/common/PageTitle";
import contactUsImg from "../../assets/images/contact-img.jpeg";
import MainInput from "../../components/form/MainInput";
import FormBtn from "../../components/form/FormBtn";
import FormError from "../../components/form/FormError";

import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LiaFaxSolid } from "react-icons/lia";

import { sendContact } from "../../services/mainServices";

const ContactUs = () => {
  const { t } = useTranslation();
  const { setting } = useSelector((state) => state.setting);

  // ✅ Validation Schema (Translated)
  const schema = yup.object({
    name: yup
      .string()
      .required(t("contactUs.errors.nameRequired"))
      .min(3, t("contactUs.errors.nameMin")),
    email: yup
      .string()
      .required(t("contactUs.errors.emailRequired"))
      .email(t("contactUs.errors.emailInvalid")),
    message: yup.string().required(t("contactUs.errors.messageRequired")),
  });

  // ✅ useForm hook
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: sendContact,
    onSuccess: () => {
      reset();
    },
  });

  // Submit handler
  const onSubmit = (data) => {
    mutate(data);
  };

  // Contact list translated
  const contactUsList = [
    {
      label: t("contactUs.phone"),
      value: setting?.whatsapp,
      link: `https://wa.me/${(setting?.whatsapp || "").replace(/\s/g, "")}`,
      icon: <TbPhoneCall />,
    },
    {
      label: t("contactUs.email"),
      value: setting?.site_email,
      link: `mailto:${setting?.site_email || ""}`,
      icon: <HiOutlineMailOpen />,
    },
    {
      label: t("contactUs.fax"),
      value: setting?.site_fax,
      icon: <LiaFaxSolid />,
    },
  ];

  return (
    <article className="container pagePadding">
      <PageTitle title={t("contactUs.title")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 whiteContainer">
        {/* Contact Form */}
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <MainInput
            label={t("contactUs.fullName")}
            id="name"
            {...register("name")}
            error={errors.name?.message}
          />

          <MainInput
            label={t("contactUs.emailAddress")}
            id="email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <MainInput
            label={t("contactUs.enquiry")}
            id="message"
            type="textarea"
            {...register("message")}
            error={errors.message?.message}
          />

          <FormError errorMsg={error?.response?.data?.message} />
          <FormBtn title={t("contactUs.submit")} loading={isPending} />
        </form>

        {/* Contact Info */}
        <div>
          <img
            src={contactUsImg}
            alt="contact us"
            className="w-full xl:w-4/5 mb-8 mx-auto hidden md:block rounded-md shadow-md"
          />

          <div className="flex flex-col lg:flex-row justify-evenly gap-4 lg:gap-2">
            {contactUsList.map(
              (item, index) =>
                item.value && (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-myBlue-1 group"
                  >
                    <span className="text-3xl group-hover:scale-120 duration-300">
                      {item.icon}
                    </span>
                    <div className="text-sm">
                      <p className="font-bold">{item.label}</p>
                      <p className="text-xs">{item.value}</p>
                    </div>
                  </a>
                )
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactUs;
