import { Link } from "react-router-dom";
import processBG from "../../../assets/images/Process-bg.jpg";

const ProcessOutSourceHero = () => {
  return (
    <section
      className="relative min-h-[80dvh] flex flex-col items-center justify-center text-center text-white px-4"
      style={{
        backgroundImage: `url(${processBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl pt-32 pb-8 space-y-4 lg:space-y-8">
        <h1 className="text-4xl md:text-7xl font-bold">Process Outsource</h1>

        <h2
          className="text-2xl md:text-5xl font-bold text-myBlue-2"
          style={{
            textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
          }}
        >
          Let’s create solutions, side by side.
        </h2>

        <p className="text-lg lg:text-xl leading-relaxed">
          Unlock new opportunities by outsourcing your production processes
          through Industrial Agora.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed">
          Our platform connects factories to share capacity, expertise, and
          technology — helping you cut costs, reduce idle time, and access
          specialized skills without heavy investment.
        </p>

        <p className="text-lg lg:text-xl leading-relaxed">
          This collaboration not only improves efficiency but also increases
          your chances of winning new projects and driving sales growth, as
          businesses can expand their reach and deliver more competitive
          solutions.
        </p>

        <Link to="/process-outsource/service" className="mainBtn w-fit mx-auto">
          Start your journey with your service now
        </Link>
      </div>
    </section>
  );
};

export default ProcessOutSourceHero;
