'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Breadcrumb = () => {


  const router = useRouter();

//   console.log('router==', pathname)

  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    // Extract the path segments from the location
    const pathSegments = router.pathname.split('/').filter(segment => segment !== '');

    // Create breadcrumb items from the path segments
    const breadcrumbItems = pathSegments.map((segment, index) => ({
      id: index,
      label: segment, // You can customize this label if needed
    }));

    setBreadcrumb(breadcrumbItems);
  }, [router.pathname]);

  return (
    <div className="flex items-center flex-wrap ">
      {breadcrumb.map((item, index) => (
        <div key={item.id} className=" ">
          {index !== 0 && <span className="mx-2">{`>`}</span>}
          <span className='capitalize'>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
