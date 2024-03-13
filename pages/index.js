import GifLoader from "@/components/common/GifLoader";
import {useEffect} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/signin/vendor');
  }, []);

  return (
    <GifLoader>
      {/* <div className="grid justify-center gap-4 text-center">
      <Link href={'/signin'} className="hover-green rounded-full px-8 py-3 text-lg font-medium">Login</Link>
      </div> */}
    </GifLoader>
  );
};

export default Index;
