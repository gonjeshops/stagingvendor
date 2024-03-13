import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";

const Loader = () => {
  return (
    <div className="fixed z-50 bg-black bg-opacity-50 inset-0 flex justify-center items-center">
        <PageLoading/>
    </div>
  );
};

export default Loader;
