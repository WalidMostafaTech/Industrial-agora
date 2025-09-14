const IndexNumber = ({ index }) => {
  return (
    <div
      className="text-4xl text-myBlue-1 font-bold mt-2 relative
                  after:content-[''] after:absolute after:top-1/2 after:start-0 
                  after:translate-x-1/3 after:-translate-y-1/2 
                  after:w-12 after:h-12 after:lg:w-14 after:lg:h-14 after:rounded-full after:bg-gray-500/20 after:z-0"
    >
      <span className="relative z-10">{index < 10 ? `0${index}` : index}</span>
    </div>
  );
};

export default IndexNumber;
