import { useEffect, useRef, useState } from 'react';

export default function PDFView() {
  const viewer = useRef(null);
  const [instance,setInstance] = useState(null)

  useEffect(() => {
    if(!instance){
      import('@pdftron/webviewer').then(() => {
        WebViewer(
          {
            path: './lib',
            initialDoc: './dummy.pdf',
          },
          viewer.current
        ).then((instance) => {
          setInstance(instance)
          const { docViewer } = instance;
          // you can now call WebViewer APIs here...
        });
      });
    }
    
  }, []);

  return (
    <div >
      <div className='webviewer' ref={viewer} style={{ height: '100vh' }}></div>
    </div>
  );
}
