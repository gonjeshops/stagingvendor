import React, { useEffect, useState } from "react";
import Workspace from "@/componentsB2b/Workspace/Workspace";
import SuppliersDetails from "@/componentsB2b/Suppliers/SuppliersDetails";
import { viewSupplierShopProducts } from "@/componentsB2b/Api2";
import { useRouter } from "next/router";
import { PageLoading } from "@/componentsB2b/Loader/Spinner/PageLoading";
import { useGlobalState } from "@/context/GlobalStateContext";
import Pagination from "@/componentsB2b/Pagination";

const SupplierDetailsPage = ({ userId, shopId, error }) => {
  const router = useRouter();
  const {setSupplierDetails} = useGlobalState()

  const limit = 8;
  const page = parseInt(router.query.page) || 1;

  const [totalPages, setTotalPages] = useState(0);

  const [supplierData, setSupplierData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const handlePageChange = (newPage) => {
    router.push(`/vendorb2b/suppliers/shop?userId=${userId}&shopId=${shopId}&page=${newPage}`);
  };


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingTimeout(true);
    }, 8000);

    const fetchData = async () => {
      try {
        const response = await viewSupplierShopProducts(userId, shopId, page, limit);

        if (response.status === 200) {
          console.log("supplierData API response:", response?.data?.data);
          setSupplierData(response?.data?.data);
          setTotalPages(response?.data?.data?.total_pages)
          setSupplierDetails(response?.data?.data?.shop)
        } else {
          setApiError("Something went wrong. Try again or consult a developer.");
        }
        clearTimeout(timeoutId); // Clear the loading timeout

      } catch (error) {
        console.error("Catch error:", error);
        setApiError("Server is not available. Try again or consult a developer.");
        clearTimeout(timeoutId); // Clear the loading timeout
      }
    };

    fetchData();

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [userId, shopId, page]);


  if (loadingTimeout) {
    return (
      <Workspace>
        <div className='absolute inset-0 flex flex-col gap-4 items-center justify-center text-center'>
          { console.log('loadingTimeout==', loadingTimeout)}
            <p className="text-lg font-semibold">
            Server is not responding. Please choose an action:
            </p>
            <div className="flex items-center gap-4">
              <button className='hover-blue rounded py-2 px-4' onClick={() => router.back()}>Go Back</button>
              <button className='hover-blue rounded py-2 px-4' onClick={() => window.location.reload()}>Reload</button>
            </div>
        </div>
      
      </Workspace>
    );
  }


  if (error) {
    return (
      <Workspace>
        <div className="absolute inset-0 flex items-center justify-center">
          Error: There's an error feedback from the server. Try again or consult a developer.
        </div>
      </Workspace>
    );
  }

  if (apiError) {
    return (
      <Workspace>
        <div className="absolute inset-0 flex items-center justify-center">{apiError}</div>
      </Workspace>
    );
  }

  if (!userId || isNaN(userId) || !shopId || isNaN(shopId)) {
    return (
      <Workspace>
        <div className="absolute inset-0 flex items-center justify-center">
          Error: The URL should contain a valid shop Id and a valid user Id.
        </div>
      </Workspace>
    );
  }

  return (
    <Workspace>
      {supplierData ? 
      <div className="space-y-12 h-full">
        <div className="pb-28">
          <SuppliersDetails supplierData={supplierData} userId={userId} shopId={shopId}/> 
        </div>
        <div className="absolute bottom-0 bg-light100 pb-4  left-0 w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

      </div>
      
      : 
      <div className="absolute inset-0 flex items-center justify-center">
        <PageLoading/>
        </div>}
    </Workspace>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const { userId, shopId } = query;

    if (!userId || isNaN(userId) || !shopId || isNaN(shopId)) {
      throw new Error("Invalid userId or shopId in the query parameters.");
    }

    return { props: { userId: parseInt(userId), shopId: parseInt(shopId) } };
  } catch (error) {
    console.error("getServerSideProps error:", error);
    return { props: { userId: null, shopId: null, error: error } };
  }
}

export default SupplierDetailsPage;
