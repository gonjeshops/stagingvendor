import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";

const Loader = () => {
  return (
    <div className="fixed bg-black bg-opacity-10 inset-0 flex justify-center items-center">
        <PageLoading/>
    </div>
  );
};

export default Loader;
