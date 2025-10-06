import Partners from "./sections/Partners";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import MainCategories from "./sections/mainCategories";
import Services from "./sections/Services";
import HomeVideo from "./sections/HomeVideo";
import MissionVisionSolution from "./sections/MissionVisionSolution";
import Process from "./sections/Process";

const Home = () => {
  return (
    <article>
      <Hero />
      <Features />
      <MainCategories />
      <Services />
      <HomeVideo />
      <MissionVisionSolution />
      <Process />
      <Partners />
    </article>
  );
};

export default Home;
