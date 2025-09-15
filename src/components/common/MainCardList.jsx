import MainCard from "./MainCard";

const MainCardList = ({ data, border = false }) => {
  return (
    <div className="space-y-8 lg:space-y-12 max-w-6xl mx-auto">
      {data.map((item, index) => (
        <MainCard key={item.id} {...item} border={border} index={index + 1} />
      ))}
    </div>
  );
};

export default MainCardList;
