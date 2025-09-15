import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import IndexNumber from "./IndexNumber";

const MainCard = ({
  index,
  title = { text: "", border: false, index: false },
  description = { text: "", border: false },
  btn = { text: "", link: "", arrow: false },
  image,
  border = false,
}) => {
  return (
    <div
      className={`flex items-center flex-col md:flex-row even:md:flex-row-reverse gap-4 md:gap-8`}
    >
      <div className="md:w-1/3 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 space-y-4">
        <div>
          {title.index && (
            <IndexNumber index={index} />
          )}

          <h3
            className={`text-xl lg:text-3xl font-bold text-myBlue-1 inline-block mt-2 min-w-1/3 lg:min-w-1/4 ${
              title.border ? "border-b-3 pb-2" : ""
            }`}
          >
            {title.text}
          </h3>
        </div>

        <p
          className={`text-gray-600 lg:text-lg ${
            description.border ? "border-b border-myBlue-2 pb-2" : ""
          }`}
        >
          {description.text}
        </p>

        <Link
          to={btn.link}
          className={`text-lg lg:text-xl font-semibold text-myBlue-2 w-fit flex items-center gap-2 group`}
        >
          {btn.text}
          {btn.arrow && (
            <FaArrowRightLong className="group-hover:translate-x-2 transition-all duration-300" />
          )}
        </Link>
      </div>
    </div>
  );
};

export default MainCard;
