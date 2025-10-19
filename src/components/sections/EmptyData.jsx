import emptyIcon from "../../assets/icons/folder-empty@3x.png";

const EmptyData = () => {
  return (
    <div>
      <img
        src={emptyIcon}
        alt="No Data"
        className="mx-auto mb-4 w-32 lg:w-40"
      />
      <p className="text-center text-gray-500 text-lg lg:text-2xl font-semibold">
        No Data Available
      </p>
    </div>
  );
};

export default EmptyData;
