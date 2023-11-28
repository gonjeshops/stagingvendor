import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    const pathSegments = router.pathname.split('/').filter(segment => segment !== '');

    const breadcrumbItems = pathSegments.map((segment, index) => ({
      id: index,
      label: segment,
      path: `/${pathSegments.slice(0, index + 1).join('/')}`,
    }));

    setBreadcrumb(breadcrumbItems);
  }, [router.pathname]);

  return (
    <div className="flex items-center flex-wrap">
      {breadcrumb.map((item, index) => (
        <div key={item.id} className="" style={{ textTransform: 'capitalize' }}>
          {index !== 0 && <span className="mx-2">{`>`}</span>}
          {item.path ? (
            <Link href={item.path} as={item.path} passHref className={router.pathname === item.path ? 'active-link' : 'hover-link'}>
                {item.label.startsWith('[') && item.label.endsWith(']') ? 
                  router.query[item.label.slice(1, -1)] :
                  item.label
                }
            
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
      <style jsx>{`
        .hover-link:hover {
          color: #3182ce; /* Change to your desired hover color */
          text-decoration: underline;
        }
        .active-link {
          color: #3182ce; /* Change to your desired active color */
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Breadcrumb;
