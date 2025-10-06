import PageTitle from "../../components/common/PageTitle";
import MainInput from "../../components/form/MainInput";
import bannerImg from "../../assets/images/request-consultation-banner.jpg";
import checkIcon from "../../assets/icons/check-icon.png";
import PageBanner from "../../components/common/PageBanner";
import FormError from "../../components/form/FormError";

const ourSolutionPoints = [
  "Redesign your product with minimized material and process and maintain or increase the quality.",
  "Resell the material to third party.",
  "Improve the machine to reduce the material or operation cost.",
  "Strengthen competitiveness by making informed, expert-driven.",
];

const RequestConsultation = () => {
  return (
    <section className="pagePadding">
      <PageTitle title="Request Consultation" />

      <PageBanner
        image={bannerImg}
        title={"Let’s cut the waste together, efficiency starts here."}
      />

      <div className="container sectionPadding grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <h3 className="text-2xl lg:text-3xl font-bold">Our Solution:</h3>

          <ul className="list-inside mt-4 space-y-2">
            {ourSolutionPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <img src={checkIcon} alt="check icon" className="w-8 lg:w-10" />
                <p className="lg:text-2xl pt-2">{point}</p>
              </li>
            ))}
          </ul>
        </div>

        <form className="whiteContainer space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <span
              className="bg-myBlue-1 text-white text-2xl lg:text-3xl font-bold 
              w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center rounded-full"
            >
              1
            </span>
            <p className="font-bold text-xl lg:text-2xl text-myBlue-1">
              Company information
            </p>
          </div>

          <MainInput label="company name" id="company_name" />
          <MainInput label="Contact person" id="contact_person" />
          <MainInput label="Email" id="email" type="email" />
          <MainInput label="phone" id="phone" type="number" />

          <div className="flex items-center gap-2">
            <span
              className="bg-myBlue-1 text-white text-2xl lg:text-3xl font-bold 
              w-8 lg:w-10 h-8 lg:h-10 flex items-center justify-center rounded-full"
            >
              2
            </span>
            <p className="font-bold text-xl lg:text-2xl text-myBlue-1">
              Consultation details
            </p>
          </div>

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
            label="Brief description of the problem"
            id="description"
            type="textarea"
          />

          <FormError errorMsg="" />

          <button type="submit" className="mainBtn w-full">
            submit
          </button>

          <p className="font-bold text-xl lg:text-2xl text-myBlue-1 text-center">
            We’ll get back to you within 24 hours
          </p>
        </form>
      </div>
    </section>
  );
};

export default RequestConsultation;
