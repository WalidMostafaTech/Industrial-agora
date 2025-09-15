import { useFormik } from "formik";
import * as Yup from "yup";
import PageTitle from "../../components/common/PageTitle";
import contactUsImg from "../../assets/images/Contact us-rafiki 1.png";
import MainInput from "../../components/form/MainInput";
import FormError from "../../components/form/FormError";
import FormBtn from "../../components/form/FormBtn";
import { LiaFaxSolid } from "react-icons/lia";
import { TbPhoneCall } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";

const ContactUs = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(3, "Must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    enquiry: Yup.string().required("Enquiry is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      enquiry: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      resetForm();
    },
  });

  const contactUsList = [
    {
      label: "Phone",
      value: "+88 123 456 789",
      icon: <TbPhoneCall />,
    },
    {
      label: "Email",
      value: "examble6@example.com",
      icon: <HiOutlineMailOpen />,
    },
    {
      label: "Fax",
      value: "03 123 45",
      icon: <LiaFaxSolid />,
    },
  ];

  return (
    <article className="container pagePadding">
      <PageTitle title="Contact Us" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <MainInput
            label="full name"
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && formik.errors.fullName}
          />

          <MainInput
            label="email address"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />

          <MainInput
            label="enquiry"
            id="enquiry"
            name="enquiry"
            value={formik.values.enquiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.enquiry && formik.errors.enquiry}
          />

          <FormError />

          <FormBtn title="Submit" />
        </form>

        <div>
          <img
            src={contactUsImg}
            alt="contact us"
            className="w-2/3 mx-auto hidden lg:block"
          />

          <div className="flex flex-wrap justify-between gap-4">
            {contactUsList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-myBlue-1"
              >
                <span className="text-5xl">{item.icon}</span>
                <div>
                  <p className="font-bold">{item.label}</p>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ContactUs;
