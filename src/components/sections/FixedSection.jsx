import { FaWhatsapp } from "react-icons/fa";

const FixedSection = () => {
  const list = [
    {
      id: 1,
      title: "whatsapp",
      link: `https://wa.me/${"20101010101"}`,
      icon: <FaWhatsapp />,
      color: "green-500",
    },
  ];

  return (
    <section className="fixed start-0 top-1/2 translate-y-1/2 z-50">
      <div className="flex flex-col items-start gap-2 lg:gap-4">
        {list.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            className="bg-white p-1 pe-2 lg:p-2 lg:pe-4 shadow-lg rounded-e-full flex items-center gap-1 lg:gap-2 group"
          >
            <p className="lg:text-xl capitalize max-w-0 overflow-hidden group-hover:max-w-70 transition-all ease-in-out duration-500">
              {item.title}
            </p>

            <span
              className="text-2xl lg:text-4xl"
              style={{ color: `var(--color-${item.color})` }}
            >
              {item.icon}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FixedSection;
