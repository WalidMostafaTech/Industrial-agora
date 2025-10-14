import PageTitle from "../../components/common/PageTitle";
import bannerImg from "../../assets/images/request-consultation-banner.jpg";
// import checkIcon from "../../assets/icons/check-icon.png";
import PageBanner from "../../components/common/PageBanner";
import ConsultationForm from "./ConsultaionForm";
import { useQuery } from "@tanstack/react-query";
import { getConsultationSettings } from "../../services/mainServices";
import LoadingSection from "../../components/Loading/LoadingSection";
import EmptySection from "../../components/sections/EmptySection";

// const ourSolutionPoints = [
//   "Redesign your product with minimized material and process and maintain or increase the quality.",
//   "Resell the material to third party.",
//   "Improve the machine to reduce the material or operation cost.",
//   "Strengthen competitiveness by making informed, expert-driven.",
// ];

const RequestConsultation = () => {
  const {
    data: consultationSettings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["consultationSettings"],
    queryFn: getConsultationSettings,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !consultationSettings) return <EmptySection />;

  return (
    <section className="pagePadding">
      <PageTitle title="Request Consultation" />

      <PageBanner
        image={bannerImg}
        title={"Let’s cut the waste together, efficiency starts here."}
      />

      <div className="container sectionPadding grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* ✅ Left Section */}
        {/* <div className="lg:col-span-3">
          <h3 className="text-2xl lg:text-3xl font-bold">Our Solution:</h3>

          <ul className="list-inside mt-4 space-y-2">
            {ourSolutionPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <img src={checkIcon} alt="check icon" className="w-8 lg:w-10" />
                <p className="lg:text-2xl pt-2">{point}</p>
              </li>
            ))}
          </ul>
        </div> */}

        <div
          className="lg:col-span-3"
          dangerouslySetInnerHTML={{
            __html: consultationSettings?.consultation_description,
          }}
        />

        {/* ✅ Right Form Section */}
        <ConsultationForm types={consultationSettings?.consultation_types} />
      </div>
    </section>
  );
};

export default RequestConsultation;
