// pages/supplier.js

import Workspace from '@/componentsB2b/Workspace/Workspace';
import SuppliersCatalogue from '@/componentsB2b/Suppliers/SuppliersCatalogue';
import { fetchSuppliers } from '@/componentsB2b/Api2';

const Supplier = ({ suppliers }) => {

  console.log('SUPPLIERS=', suppliers)
  return (
    <Workspace>
      <SuppliersCatalogue supplierss={suppliers} />
    </Workspace>
  );
};

export async function getServerSideProps() {
  const response = await fetchSuppliers();
  console.log('API response===', response, 'suppliers==', )

  return {
    props: {
      suppliers: response,
    },
  };
}

export default Supplier;
