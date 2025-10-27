const StepProgress = ({ steps, currentIndex }) => {
  return (
    <div className="relative">
      <div className="relative flex justify-between gap-4">
        {/* ✅ الخط الخلفي الرمادي */}
        <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -translate-y-1/2 rounded-full"></div>

        {/* ✅ الخط الأمامي الملون (progress line) */}
        <div
          className="absolute top-1/2 left-0 h-[3px] bg-myBlue-2 -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={index}
              className={`w-8 h-8 lg:w-10 lg:h-10 z-10 flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-700
                  ${
                    isActive
                      ? "bg-myGreen text-white border-myGreen scale-120"
                      : isCompleted
                      ? "bg-myBlue-2 text-white border-myBlue-2"
                      : "bg-white text-gray-500 border-gray-300"
                  }
                `}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      {/* <div className="relative flex justify-between gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <p
              key={index}
              className={`mt-2 text-xs sm:text-sm font-medium transition-colors duration-500
                  ${
                    isActive
                      ? "text-myGreen"
                      : isCompleted
                      ? "text-myGreen"
                      : "text-gray-500"
                  }
                `}
            >
              {step.title}
            </p>
          );
        })}
      </div> */}
    </div>
  );
};

export default StepProgress;
