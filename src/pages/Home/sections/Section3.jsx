import { Link } from "react-router-dom";
import arrowIcon from "../../../assets/icons/arrow-2.png";
import lockIcon from "../../../assets/icons/lock.png";
import starIcon from "../../../assets/icons/star.png";

const Section3List = [
  {
    title: "Easy Trading",
    description:
      "Register in minutes and start discovering verified suppliers.",
    icon: arrowIcon,
  },
  {
    title: "Safe & Reliable",
    description: "Every deal comes with trust, security, and clear records.",
    icon: lockIcon,
  },
  {
    title: "Global Opportunities",
    description: "Buy and sell across borders with the best market prices.",
    icon: starIcon,
  },
];

const Section3 = () => {
  return (
    <section className="sectionPadding my-8 container">
      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8 text-center lg:text-start">
        <div className="flex flex-wrap justify-center lg:justify-between items-center gap-4">
          <h2 className="text-2xl lg:text-4xl font-bold mb-6 lg:max-w-lg">
            Join us in reshaping the future of industrial collaboration.
          </h2>
          <Link className="animationBtn hidden lg:block">Get Started</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Section3List.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center lg:items-start gap-4 group"
            >
              <span>
                <img
                  src={item.icon}
                  alt={item.title}
                  className="group-hover:scale-130 duration-300"
                />
              </span>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        <Link className="animationBtn lg:hidden w-fit mx-auto mt-4">
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Section3;
