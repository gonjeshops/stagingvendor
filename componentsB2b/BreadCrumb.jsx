import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    // Extract the path segments from the location
    const pathSegments = router.pathname.split('/').filter(segment => segment !== '');

    // Create breadcrumb items from the path segments
    const breadcrumbItems = pathSegments.map((segment, index) => ({
      id: index,
      label: segment,
      path: `/${pathSegments.slice(0, index + 1).join('/')}`, // Build the path for the link
    }));

    setBreadcrumb(breadcrumbItems);
  }, [router.pathname]);

  return (
    <div className="flex items-center flex-wrap">
      {breadcrumb.map((item, index) => (
        <div key={item.id} className="">
          {index !== 0 && <span className="mx-2">{`>`}</span>}
          {item.path ? (
            // Check if there's a path (i.e., a link) and add hover classes
            <Link href={item.path} className="capitalize hover:text-blue-500 hover:underline">
                {item.label.startsWith('[') && item.label.endsWith(']') ? 
                  router.query[item.label.slice(1, -1)] :
                  item.label
                }
           
            </Link>
          ) : (
            <span className="capitalize">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
