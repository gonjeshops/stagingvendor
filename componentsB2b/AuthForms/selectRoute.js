
import { vendorUrl, supplierUrl, customerUrl, superadminUrl } from './url';
import { toast } from 'react-toastify';

// Possible permissions
const permissions = [
  ["super_admin", "customer", "store_owner", "admin_staff", "vendor_b2b", "supplier"]];

export const determineRouteBasedOnPermissions = (userPermissions) => {
  if(!userPermissions) {
    toast('User not fully authenticated')
    return `${customerUrl}`;
  }

  if (userPermissions.includes('super_admin') || userPermissions.includes('admin_staff') ) {
    console.log('admin')
    return `${vendorUrl}signin/vendor-select`;
  } else if (userPermissions.includes('store_owner') && !userPermissions.includes('vendor_b2b')) {
    console.log('store-owner only')
    return `${vendorUrl}signin/vendor-select`;

  } else if (userPermissions.includes('vendor_b2b')) {
    console.log('vendorb2b ')
    return `${vendorUrl}signin/vendor-select`;

  } else if (userPermissions.includes('supplier')) {
    console.log('supplier')
    return `${supplierUrl}workspace`;
  } else {
    console.log('customer only, userPermissions',  userPermissions)
    return `${customerUrl}dashboard`;

  }

};

