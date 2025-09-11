import { useFormik } from "formik";
import * as Yup from "yup";
import FormBtn from "../../../components/form/FormBtn";
import FormError from "../../../components/form/FormError";
import MainInput from "../../../components/form/MainInput";

const RequestQuotation = () => {
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

  return (
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
  );
};

export default RequestQuotation;
