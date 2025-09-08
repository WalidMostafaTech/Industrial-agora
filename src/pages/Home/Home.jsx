import Brands from "./sections/Brands";
import Hero from "./sections/Hero";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";

const Home = () => {
  return (
    <article>
      <Hero />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Brands />
    </article>
  );
};

export default Home;
