import missionIcon from "../../../assets/icons/mission 2.png";
import ideaIcon from "../../../assets/icons/5ec9ae4de2827d68b80c82ee643d00e16871f1cd.png";
import eyeIcon from "../../../assets/icons/193a563129355d056e72368071bf44766b45b1a7.png";
import { Link } from "react-router-dom";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";
import { useSelector } from "react-redux";

const MissionVisionSolution = () => {
  const { setting, loading, error } = useSelector((state) => state.setting);

  if (loading) return <LoadingSection />;

  if (error || (!setting?.mission && !setting?.solution && !setting?.vission))
    return null;

  const MissionVisionSolutionList = [
    {
      title: "Our Solution",
      paragraph: setting?.solution,
      icon: ideaIcon,
      color: "var(--color-myBlue-2)",
      link: "/about-us",
    },
    {
      title: "Mission",
      paragraph: setting?.mission,
      icon: missionIcon,
      color: "var(--color-myGreen)",
      link: "/about-us",
    },
    {
      title: "Vision",
      paragraph: setting?.vission,
      icon: eyeIcon,
      color: "white",
      link: "/about-us",
    },
  ];

  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="px-4 grid gap-6 lg:grid-cols-2 lg:grid-rows-2 max-w-6xl mx-auto">
        {MissionVisionSolutionList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center gap-4 text-center group p-6`}
            style={{
              gridRow: index === 1 ? "span 2 / span 2" : undefined,
              backgroundColor: item.color,
              color: item.color === "white" ? "var(--color-myBlue-1)" : "white",
            }}
          >
            <div className="flex justify-center items-center gap-2">
              <img src={item.icon} alt={item.title} className="w-10" />
              <h3 className="text-2xl font-semibold">{item.title}</h3>
            </div>
            <div
              className="htmlContent"
              dangerouslySetInnerHTML={{ __html: item.paragraph }}
            />
            <Link
              to={item.link}
              className={`animationBtn ${
                item.color === "white" ? "" : "light"
              }`}
            >
              details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionVisionSolution;
