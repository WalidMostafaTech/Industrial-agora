import Partners from "./sections/Partners";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import MainCategories from "./sections/mainCategories";
import Services from "./sections/Services";
import MissionVisionSolution from "./sections/MissionVisionSolution";

const Home = () => {
  return (
    <article>
      <Hero />
      <Features />
      <MainCategories />
      <Services />
      <MissionVisionSolution />
      <Partners />
    </article>
  );
};

export default Home;
