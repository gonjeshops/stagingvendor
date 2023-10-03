import Workspace from '@/componentsB2b/Workspace/Workspace';
import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchSuppliersByPagination } from '@/componentsB2b/Api2';

const Supplier = ({suppliersData, totalPages}) => {


  console.log('suppliersData=', suppliersData, 'totalPages=', totalPages)

  return (
    <Workspace>
      <SuppliersCatalogue  suppliersData={suppliersData} totalPages={totalPages}  />
    </Workspace>
  );
};

export async function getServerSideProps({ query }) { // Use 'query' instead of 'params'
  try {
    const { page=1 } = query;
    let limit=12
   
    const { data } =  await fetchSuppliersByPagination(page, limit)
    console.log('currentPage', 'limit',  'DATA=', data);
    
    return {
      props: {
        suppliersData: data?.data,
        totalPages: data?.total_pages, // Correct the property name to match the response
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        suppliersData: [], // Provide a default value or handle the error case
        totalPages: 0, // Provide a default value or handle the error case
      },
    };
  }
}

export default Supplier;
