import { useRouter } from 'next/router';
import { vendorUrl, supplierUrl, customerUrl, superadminUrl } from './url';

// Possible permissions
const permissions = ['customer', 'store-owner', 'vendorb2b', 'supplier', 'admin'];

export const selectRoute = (userPermissions) => {
  const router = useRouter();

  if (userPermissions.includes('admin')) {
    router.push(`${superadminUrl}/workspace`);
  } else if (userPermissions.includes('store-owner') && !userPermissions.includes('vendorb2b')) {
    router.push(`${vendorUrl}/dashboard`);
  } else if (userPermissions.includes('vendorb2b')) {
    router.push(`${vendorUrl}/vendorb2b`);
  } else if (userPermissions.includes('supplier')) {
    router.push(`${supplierUrl}/workspace`);
  } else {
    router.push(`${customerUrl}/dashboard`);
  }
};
