import ReactLoading from "react-loading";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading === true ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <ReactLoading
            type={"bubbles"}
            color={"bg-primary"}
            height={50}
            width={50}
          />
        </div>
      ) : null}
    </>
  );
};

export default Loader;
