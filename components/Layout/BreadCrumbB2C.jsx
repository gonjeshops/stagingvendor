import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaChartBar } from 'react-icons/fa';
import { IoMdApps } from 'react-icons/io';

// const Breadcrumb = () => {
//   const router = useRouter();
//   const [breadcrumb, setBreadcrumb] = useState([]);

//   useEffect(() => {
//     const pathSegments = router.pathname.split('/').filter(segment => segment !== '');

//     const breadcrumbItems = pathSegments.map((segment, index) => ({
//       id: index,
//       label: segment,
//       path: `/${pathSegments.slice(0, index + 1).join('/')}`,
//     }));

//     setBreadcrumb(breadcrumbItems);
//   }, [router.pathname]);

//   if (breadcrumb.length <= 1 && router.pathname !==`/dashboard` ) {
//     return (
//       <div className='flex gap-2 items-center'>
//         <Link href={'/dashboard'} as={'/dashboard'} passHref> <IoMdApps size={20} /> </Link > 
//         <span className=''>{`>`}</span> 
//         <Link href={breadcrumb?.[0]?.path} as={breadcrumb?.[0]?.path} passHref  className='capitalize'>{breadcrumb?.[0]?.label}</Link> 
//       </div>
//     )
//   } else if (breadcrumb.length <= 1 && router.pathname === `/dashboard` ) {
//     return null
//   }

//   return (
//     <div className="flex items-center flex-wrap">

//       {router.pathname===`/dashboard` ? '':  <><Link href={'/dashboard'} as={'/dashboard'} passHref > <IoMdApps size={20}/>  </Link>  <span className='mx-2'>{`>`}</span> </>} 

//       {breadcrumb.map((item, index) => (
//         <div key={item.id} className="" style={{ textTransform: 'capitalize' }}>
//           {index !== 0 && <span className="mx-2">{`>`}</span>}
//           {item.path ? (
//               <Link href={item.path} as={item.path} passHref className={router.pathname === item.path ? 'active-link' : 'hover-link'}>
//                 {item.label.startsWith('[') && item.label.endsWith(']') ? 
//                   router.query[item.label.slice(1, -1)] :
//                   item.label
//                 }
//               </Link>
//             ) : (
//             <span>{item.label}</span>
//           )}
//         </div>
//       ))}

//       <style jsx>{`
//         .hover-link:hover {
//           color: #3182ce; /* Change to your desired hover color */
//           text-decoration: underline;
//         }
//         .active-link {
//           color: #3182ce; /* Change to your desired active color */
//           text-decoration: underline;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Breadcrumb;

// ... (imports)

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

  if (router?.pathname === `/dashboard`) {
    return null; // Show breadcrumb only when there are more than one segments
  }

  return (
    <div className="flex items-center flex-wrap">
      {router.pathname !== '/dashboard' && (
        <>
          <Link href="/dashboard" >
            <IoMdApps size={20} />
          </Link>
          <span className="mx-2">{`>`}</span>
        </>
      )}

      {breadcrumb.map((item, index) => (
        <div key={item.id} className="" style={{ textTransform: 'capitalize' }}>
          {index !== 0 && <span className="mx-2">{`>`}</span>}
          {item.path ? (
            <Link href={item.path}  className={router.pathname === item.path ? 'active-link' : 'hover-link'}>
              {item.label.startsWith('[') && item.label.endsWith(']') ? router.query[item.label.slice(1, -1)] : item.label}
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
