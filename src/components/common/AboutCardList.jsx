import AboutCard from "./AboutCard";

const AboutCardList = ({ data }) => {
  return (
    <div className="space-y-8 lg:space-y-12 max-w-6xl mx-auto">
      {data.map((item) => (
        <AboutCard key={item.id} {...item}  />
      ))}
    </div>
  );
};

export default AboutCardList;
