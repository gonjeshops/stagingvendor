import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Navigation from '../Navigation/Navigation';
import Footer from '../Navigation/Footer';
import { useDarkmode } from '@/lib/useDarkmode';
import HeadSEO from './HeadSEO';
import ModalLayout from '../Modal/ModalLayout';

const Layout = ({ children }) => {

  const { bgLightness, bgLightnessLoaded, themeBtn} = useDarkmode(100, 25)

  
  
  return (
    bgLightnessLoaded && <div className={`transition bg-light200 text-dark200 text-sm`}>
      <Navigation themeBtn={themeBtn}/>
      <ModalLayout/>
      <HeadSEO/>
        <main className=''>{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;
