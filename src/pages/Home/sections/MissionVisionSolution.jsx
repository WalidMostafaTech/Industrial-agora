import missionIcon from "../../../assets/icons/mission 2.png";
import ideaIcon from "../../../assets/icons/5ec9ae4de2827d68b80c82ee643d00e16871f1cd.png";
import eyeIcon from "../../../assets/icons/193a563129355d056e72368071bf44766b45b1a7.png";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMissionAndVisionAndSolution } from "../../../services/homeServices";
import LoadingSection from "../../../components/Loading/LoadingSection";
import EmptySection from "../../../components/sections/EmptySection";

const MissionVisionSolution = () => {
  const {
    data: missionAndVisionAndSolution,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["missionAndVisionAndSolution"],
    queryFn: getMissionAndVisionAndSolution,
  });

  if (isLoading) return <LoadingSection />;

  if (isError || !missionAndVisionAndSolution) return <EmptySection />;

  const MissionVisionSolutionList = [
    {
      title: "Mission",
      paragraph: missionAndVisionAndSolution?.mission,
      icon: missionIcon,
      color: "var(--color-myBlue-2)",
    },
    {
      title: "Our Solution",
      paragraph: missionAndVisionAndSolution?.solution,
      icon: ideaIcon,
      color: "var(--color-myGreen)",
    },
    {
      title: "Vision",
      paragraph: missionAndVisionAndSolution?.vission,
      icon: eyeIcon,
      color: "white",
    },
  ];

  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="px-4 max-w-6xl mx-auto mb-8 lg:mb-12">
        <iframe
          src="https://www.youtube.com/embed/gxmOJ_yo7FE?si=VqdoqcBIwv8LtsuN"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video"
        ></iframe>
      </div>

      <div className="px-4 grid gap-6 lg:grid-cols-2 lg:grid-rows-2 max-w-6xl mx-auto">
        {MissionVisionSolutionList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center gap-4 md:gap-8 ${
              index === 1 && "lg:gap-12"
            } text-center group p-6`}
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
              className="htmlContent lg:w-2/3"
              dangerouslySetInnerHTML={{ __html: item.paragraph }}
            />
            <Link
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
