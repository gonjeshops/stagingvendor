// import GifLoader from "@/components/common/GifLoader";
// import {useEffect} from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";

const index = () => {
  return (
    <>
    </>
  );
};

export default index;

export async function getStaticProps({ params }) {
  return {
    redirect: {
      destination: '/signin/vendor',
      permanent: true // or false, depending on whether it's a permanent redirect
    }
  };
}



// const RootPage = () => {
//   // const router = useRouter()
//   // useEffect(() => {
//   //    router.push("/vendorb2b");
//   // }, []);
//   return (
//     <>
//       <GifLoader>
//           <div className="grid justify-center gap-4 text-center">
//           {/* <ChristmasCard/> */}
            
//           <h3 className="font-bold text-5xl">Superlanding</h3>
//           <Link href={'/signin'} className="hover-green rounded-full px-8 py-3 text-lg font-medium">Login</Link>
//           </div>
//       </GifLoader>
//     </>

//   )
// };

// export default RootPage;



// export const ChristmasCard = () => {
//   return (
//     <div className="
//    ">
//      <iframe
//       src="https://assets.pinterest.com/ext/embed.html?id=629518854191572720"
//       height="295"
//       width="345"
//       frameBorder="0"
//       scrolling="no"
//       title="Pinterest Embed"
//     ></iframe>
//   </div>
//   );
// };


