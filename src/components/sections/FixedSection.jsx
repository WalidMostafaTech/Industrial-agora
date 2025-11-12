import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

const FixedSection = () => {
  const { setting } = useSelector((state) => state.setting);

  const list = [
    {
      id: 1,
      title: "whatsapp",
      link: `https://wa.me/${(setting?.whatsapp || "").replace(/\s/g, "")}`,
      icon: <FaWhatsapp />,
      color: "#25D366",
    },
  ];

  return (
    <section className="fixed start-0 top-1/2 translate-y-1/2 z-30">
      <div className="flex flex-col items-start gap-2">
        {list.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            className="bg-white p-1 pe-2 shadow-lg rounded-e-full flex items-center gap-1 lg:gap-2 group"
          >
            <p className="lg:text-sm font-semibold capitalize max-w-0 overflow-hidden group-hover:max-w-32 transition-all ease-in-out duration-500">
              {item.title}
            </p>

            <span className="text-3xl" style={{ color: `${item.color}` }}>
              {item.icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FixedSection;
