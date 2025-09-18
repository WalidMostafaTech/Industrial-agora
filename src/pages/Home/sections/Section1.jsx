import fingerIcon from "../../../assets/icons/finger 2.png";
import callIcon from "../../../assets/icons/call-forwarding 1.png";
import trustWorthinessIcon from "../../../assets/icons/trustworthiness 1.png";

const Section1List = [
  {
    title: "Ease of access",
    description: "Easily browse hundreds of products with clear divisions.",
    icon: fingerIcon,
  },
  {
    title: "Direct contact",
    description:
      "Connect with suppliers and companies directly without an intermediary.",
    icon: callIcon,
  },
  {
    title: "Trusted Deals",
    description:
      "We provide a safe trading environment that ensures the satisfaction of all parties.",
    icon: trustWorthinessIcon,
  },
];

const Section1 = () => {
  return (
    <section className="sectionPadding container my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Section1List.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-4 text-center group"
          >
            <span>
              <img
                src={item.icon}
                alt={item.title}
                width="100%"
                className="group-hover:scale-130 duration-300"
              />
            </span>
            <h3 className="text-2xl font-semibold">{item.title}</h3>
            <p className="text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Section1;
