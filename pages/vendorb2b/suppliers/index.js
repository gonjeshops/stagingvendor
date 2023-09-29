// pages/supplier.js

import Workspace from '@/componentsB2b/Workspace/Workspace';
import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue';
import { fetchSuppliers } from '@/componentsB2b/Api2';
import { suppliersFakeData  } from '@/data/suppliers';


const Supplier = ({ suppliers }) => {

  console.log('SUPPLIERS=', suppliers)
  return (
    <Workspace>
      <SuppliersCatalogue suppliers={suppliers} />
    </Workspace>
  );
};

export async function getServerSideProps() {
  const response = await fetchSuppliers();
  console.log('API response===', response )
  let suppliers = response ? response.data : suppliersFakeData
  return {
    props: {
      suppliers: suppliers,
    },
  };
}

export default Supplier;
