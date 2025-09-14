import PageTitle from "../../components/common/PageTitle";
import FormBtn from "../../components/form/FormBtn";
import FormTitle from "../../components/form/FormTitle";
import MainInput from "../../components/form/MainInput";

const Request = () => {
  return (
    <section className="container pagePadding">
      <PageTitle title="Consultation" />

      <form className="whiteContainer space-y-6 max-w-3xl mx-auto">
        <FormTitle
          title="Request a consultation"
          subtitle="Fill out the consultation request form and our team will contact you to confirm the appointment and details."
        />

        <MainInput label="company name" id="company_name" />

        <MainInput
          label="Name of company owner/person in charge"
          id="company_owner"
        />

        <MainInput label="e-mail" id="email" type="email" />

        <MainInput label="phone number" id="phone" type="number" />

        <MainInput
          label="Type of consultation required"
          id="consultation_type"
          type="select"
          options={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
          ]}
        />

        <MainInput
          label="Brief description of the problem/topic"
          id="description"
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

export default Request;
