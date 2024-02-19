import Image from "next/image";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { UploadSvg } from "../../../../assets";

// const dropzoneStyle = {
//   width: "100%",
//   height: "auto",
//   borderWidth: 2,
//   borderColor: "rgb(102, 102, 102)",
//   borderStyle: "dashed",
//   borderRadius: 5,
// };

// const UploadImages = ({
//   title,
//   multiple,
//   subTitle,
//   addAttachments,
//   attachmentFiles,
//   onChange,
//   values,
// }) => {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     if (values?.image) {
//       setFiles([values.image]);
//     }
//     if (values?.gallery?.length > 0) {
//       setFiles(values.gallery);
//     }
//   }, [values]);

//   const handleFileChange = (e) => {
//     e.preventDefault()
//     const files = Array.from(e.target.files);
//      // Validate file types and sizes
//      const allowedTypes = [
//         'image/jpeg',
//         'image/png',
//         'image/gif',
//         'image/bmp',
//         'image/webp',
//         'image/tiff',
//         'image/svg+xml',
//         'image/heif',
//       ]; 
//       const maxSize = 10 * 1024 * 1024; // 10MB
  
//       const invalidFiles = files.filter((file) => {
//         if (!allowedTypes.includes(file.type)) {
//           console.log(`Invalid file type: ${file.name}`);
//           return true;
//         }
//         if (file.size > maxSize) {
//             console.log(`File size exceeds 10MB: ${file.name}`);
//           return true;
//         }
//         return false;
//       });
  
//       // Only update selectedFiles if all files are valid
//       if (invalidFiles.length === 0) {
//         // setUploadError('');
//         // return(files);
//         addAttachments({
//           "attachment[]": files,
//           "id": 5,
//           "type": 'product'
//         }).then((action) => {
//           const filesData = action?.payload?.data?.data || [];
    
//           if (filesData.length > 0) {
//             const key = multiple ? "gallery" : "image";
//             const data = multiple
//               ? filesData.map((el) => {
//                   return {
//                     original: el.original,
//                     thumbnail: el.thumbnail,
//                     id: el.id,
//                   };
//                 })
//               : {
//                   original: filesData[0].original,
//                   thumbnail: filesData[0].thumbnail,
//                   id: filesData[0].id,
//                 };
//             onChange(key, data);
//           }
    
//           setFiles(filesData);
//         });
//       }
//   };

//   const handleFileDrop = (files) => {
//     var formData = new FormData();
//     files.map((i) => formData.append(`attachment[]`, i));
// const form = {
//   "attachment[]": handleFileChange,
//   "type": "product",
//   "id": 5,
// }

//     addAttachments(form).then((action) => {
//       const filesData = action?.payload?.data?.data || [];

//       if (filesData.length > 0) {
//         const key = multiple ? "gallery" : "image";
//         const data = multiple
//           ? filesData.map((el) => {
//               return {
//                 original: el.original,
//                 thumbnail: el.thumbnail,
//                 id: el.id,
//               };
//             })
//           : {
//               original: filesData[0].original,
//               thumbnail: filesData[0].thumbnail,
//               id: filesData[0].id,
//             };
//         onChange(key, data);
//       }

//       setFiles(filesData);
//     });
//   };

//   return (
//     <div className="col-lg-6 text-center">
//       <div className={`feature-image ${multiple ? "gallry" : ""}`}>
//         <h3>{title}</h3>
//         <input
//           type="file"
//           multiple
//           onChange={handleFileChange}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//         <Dropzone
//           accept="image/jpeg, image/png, image/jpg"
//           style={dropzoneStyle}
//           onDrop={handleFileDrop}
//           multiple={multiple}
//         >
//           {({ getRootProps, getInputProps }) => (
//             <section>
//               <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <p>{subTitle}</p>
//                 <div className="m-6 rounded border border-dashed border-[#ccc] py-12 flex flex-col items-center ">
//                   <Image src={UploadSvg} alt="" height={50} width={50} />
//                   <p>
//                     <span>Upload an image </span> Or Drag and drop
//                     <br />
//                     Png, Jpg
//                   </p>
//                 </div>
//               </div>
//             </section>
//           )}
//         </Dropzone>
//         <div className="d-flex">
//           {(files || []).map((el) => {
//             return (
//               <div className="upload_img" key={`key_${el.id}`}>
//                 <Image
//                   // style={{ height: 100, width: 100 }}
//                   src={el.thumbnail}
//                   alt=""
//                   height={50}
//                   width={50}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

import { FiUploadCloud } from 'react-icons/fi';
// import { uploadImages } from '../Api2';
import { BtnSpinner } from "@/componentsB2b/Loader/Spinner/BtnSpinner";
import { addAttachments } from "@/api/inventory";
import { toast } from "react-toastify";
import { uploadImages, uploadImagesFetch } from "@/componentsB2b/Api2";
import { useGlobalState } from "@/context/GlobalStateContext";
import { FaTimes } from "react-icons/fa";


const UploadImages = ({onChange, productData}) => {
  const {user} = useGlobalState()

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const [coverImg, setCoverImg] = useState('')

  const handleFileChange = (e) => {
    e.preventDefault()
    const files = Array.from(e.target.files);
     // Validate file types and sizes
     const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/bmp',
        'image/webp',
        'image/tiff',
        'image/svg+xml',
        'image/heif',
      ]; 
      const maxSize = 10 * 1024 * 1024; // 10MB
  
      const invalidFiles = files.filter((file) => {
        if (!allowedTypes.includes(file.type)) {
            setUploadError(`Invalid file type: ${file.name}`);
          return true;
        }
        if (file.size > maxSize) {
            setUploadError(`File size exceeds 10MB: ${file.name}`);
          return true;
        }
        return false;
      });
      if (invalidFiles.length === 0) {
        setUploadError('');
        setSelectedFiles(files);
      }
  };

  const handleUpload = async () => {
    setUploading(true);
    setUploadError(null);

    if (selectedFiles.length === 0) {
        console.error('No files selected');
        setUploadError('Please select at least one file.');
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        formData.append('attachment[]', file);
      }

      formData.append('id', user?.user_id);
      formData.append('type', 'product');


    try {
      const response = await uploadImagesFetch(formData);

      if (response.status === 1 && !response?.data?.errors) {
        setUploadSuccess(true);
        toast.success('successful image upload')
        onChange('gallery', [...productData.gallery, ...response?.data])
        console.log('upload res', response,  'prod====', productData)
        setSelectedFiles([])
      } else {
        setUploadError('API error');
      }
    } catch (error) {
      setUploadError('An error occurred during the upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const updateProduct = ( ) => {
      if (productData, coverImg) {
        onChange('image', coverImg)
      } else {
        console.log('Updating product error: Uploaded image list is missing', productData,)
      }
    }
  updateProduct()
  }, [coverImg])

  const handleRemoveImage = (removedImage) => {
    const updatedImages = productData.gallery.filter((image) => image.id !== removedImage.id);
    onChange('gallery', updatedImages)
    setTimeout(() => {
      if(productData.image.id === removedImage.id){
        setCoverImg(productData.gallery.length ? productData.gallery[0] : '')
       }
    }, 1000);
  };
  return (
    <div className="max-w-6xl mx-auto  bg-background p-4 rounded-lg ">
      <h4 className="text-xl font-semibold text-center pb-4">Add and select images for the product</h4>
      <div className="relative border border-dashed border-gray-400 rounded-md p-8 flex flex-col items-center">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <FiUploadCloud className="text-4xl mb-2 text-gray-500" />
        <p className="text-sm text-gray-600">Drag & Drop or Click to Upload</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedFiles.map((file) => (
            <img
              key={file.name}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-16 h-16 object-cover rounded-md"
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className={ `${selectedFiles.length === 0 ? ' bg-zinc-300 text-zinc-400 cursor-not-allowed ' : 'hover-blue'} w-60 text-center mt-4   px-4 py-2 rounded-md`}
      >
        {uploading ? <BtnSpinner /> : 'Upload Images'}
      </button>
      {uploadSuccess && <p className="mt-2 text-green-500">Upload successful!</p>}
      {uploadError && <p className="mt-2 text-red-500">{uploadError}</p>}

      {
            productData?.gallery.length ? (
            <div className="pb-10"> 
              <h4 className="font-medium py-3 text-base">Choose image to display on product card</h4>
              <div className="flex flex-wrap gap-3 mt- w-full">
                  {productData?.gallery?.map((file, i)=> (
                    
                      <div 
                      onClick={()=>setCoverImg(file)}
                      key={i} className={`${coverImg?.id === file?.id ? 'border-2 border-blue-500' : ''}  cursor-pointer  inset-0 shrink-0 overflow-hidden w-20 h-20 rounded-md relative`}> 
                        <img src={file?.thumbnail} alt="fileimg" className="w-full h-full object-cover" />
                        <div className="absolute right-1 top-1 flex">
                          <button onClick={(e)=>{
                            e.stopPropagation()
                            handleRemoveImage(file)
                          }
                            } className='p-1 rounded-full text-sm hover-red '> <FaTimes/> </button>
                        </div>
                      </div>
                  )) 
                  }
              </div>
              {coverImg?.id && <p className='py-4 text-gray-500 text-[12px]'>You have chosen image-{coverImg?.id} as the cover image.</p>}
            </div>
            ) : null
        }

      
    </div>
  );
};

export default UploadImages;

// const mapStateToProps = function (state) {
//   return {
//     attachmentFiles: state.inventory.attachmentsList,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addAttachments: (shop_id) => {
//       return dispatch(addAttachmentList(shop_id));
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
