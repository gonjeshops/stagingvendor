import Workspace from "@/componentsB2b/Workspace/Workspace";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from 'axios';
import SuppliersDetails from "@/componentsB2b/Suppliers/SuppliersDetails";
import { viewSupplierShopProducts } from "@/componentsB2b/Api2";

const SupplierDetailsPage = ({ supplier }) => {
  // const [supplierData, setSupplierData] = useState(null);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios({
  //         method: 'get',
  //         url: '/api/test/supplier-details',
  //         params: { supplierId: supplier },
  //       });

  //       if (response.status === 200) {
  //         setSupplierData(response.data.data);
  //       }
  //     } catch (error) {
  //       setError(error.message); // Handle error and set the error state
  //     }
  //   };

  //   fetchData();
  // }, [supplier]);
    


//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   if (!course || undefined) {
//     return <div>Course not found</div>;
//   }
console.log(supplier)
  return (
    <Workspace>
    
      <div>
        {supplier ? (
          <SuppliersDetails supplierData={supplier?.data}/>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    
  </Workspace>
  )

    
};

export async function getServerSideProps({ query, params, req }) {
  

  try {
    // Fetch course data by slug
    const slug = params.slug
    const {userId, shopId} = query
    const supplierData = await viewSupplierShopProducts(userId, shopId)

console.log('supplierData', supplierData, 'slug', slug, 'userId', userId, 'shopId', shopId)

    if (!supplierData?.data) {
      return {
        notFound: true, // Return a 404 response if course is not found
      };
    }

    return { props: { supplier: supplierData?.data } };
  } catch (error) {
    console.error(error);
    return { props: { supplier: null } };
  }
}

export default SupplierDetailsPage;
