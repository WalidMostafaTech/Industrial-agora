import missionIcon from "../../../assets/icons/mission 2.png";
import ideaIcon from "../../../assets/icons/5ec9ae4de2827d68b80c82ee643d00e16871f1cd.png";
import eyeIcon from "../../../assets/icons/193a563129355d056e72368071bf44766b45b1a7.png";
import { Link } from "react-router-dom";

const Section4List = [
  {
    title: "Mission",
    description:
      "Our mission is to simplify trade by providing businesses with seamless access to reliable suppliers, competitive prices, and efficient logistics services.",
    icon: missionIcon,
    color: "var(--color-myBlue-2)",
  },
  {
    title: "Our Solution",
    description:
      "We offer an all-in-one platform where businesses can discover products, connect with verified suppliers, and complete deals securely and transparently.",
    icon: ideaIcon,
    color: "var(--color-myGreen)",
  },
  {
    title: "Vision",
    description:
      "To be the leading B2B platform that connects businesses with the best industrial products, raw materials, and equipment in one trusted marketplace.",
    icon: eyeIcon,
    color: "white",
  },
];

// 🟢 مصفوفة ألوان للكروت

const Section4 = () => {
  return (
    <section className="sectionPadding bg-myBlue-1">
      <div className="container grid gap-6 lg:grid-cols-2 lg:grid-rows-2 max-w-7xl mx-auto">
        {Section4List.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center ${
              index === 1 ? "gap-4 lg:gap-12" : "gap-4"
            } text-center group p-4`}
            style={{
              gridRow: index === 1 ? "span 2 / span 2" : undefined,
              backgroundColor: item.color,
              color: item.color === "white" ? "black" : "white",
            }}
          >
            <div className="flex justify-center items-center gap-2">
              <img src={item.icon} alt={item.title} className="w-10" />
              <h3 className="text-2xl font-semibold">{item.title}</h3>
            </div>
            <p>{item.description}</p>
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

export default Section4;
