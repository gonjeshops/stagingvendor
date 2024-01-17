import { fetchService, vendorUrl } from "@/api";
import { uploadImagesFetch } from "@/componentsB2b/Api2";
import { BtnSpinner } from "@/componentsB2b/Loader/Spinner/BtnSpinner";
import { useState } from "react";
import { FaRegTimesCircle, FaTimes } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";

export const UploadAttachments = ({setModal, setRefectchUser, modal, user, uploadType}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);


    const handleFileChange = (e) => {
        e.preventDefault()
        const files = Array.from(e.target.files);
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

                //     id=shop_id // id of the shop to be updated
                // // for logo
                // type=logo
                // // for cover image
                // type=cover_image for cover image
    const handleUpload = async () => {
        setUploading(true);
        setUploadError(null);

        if (selectedFiles.length === 0) {
            setUploadError('Please select one file.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            formData.append('attachment[]', file);
        }

        formData.append('id', user?.shops?.[0]?.id || user?.id);
        uploadType === 'logo' && formData.append('type', 'logo');
        uploadType === 'cover_image' && formData.append('type', 'cover_image');

        try {
        const response = await uploadImagesFetch(formData);
        console.log( 'formData', formData)
        if (response.status === 1 && !response?.data?.errors) {
            console.log('upload res', response,  'prod====', productData)
// 'upload res', response,
            // update user 
            const response= await fetchService({
                url: vendorUrl,
                method: 'PUT',
                body: {...user?.shops?.[0],
                    logo:  uploadType === 'logo' ? response?.data : user?.shops?.[0]?.logo,
                    cover_image:  uploadType === 'cover_image' ? response?.data : user?.shops?.[0]?.cover_image,
                },
              })
              if (response?.status===200) {
                console.log('formRes=', response);
                toast.success('Upload successful');
                setSelectedFiles([])
                setRefectchUser(true)
                setModal(false)
              } else {
                console.log(response);
                toast.error('Registration failed');
              }
            
        } else {
            setUploadError('API error');
        }
        } catch (error) {
            setUploadError('An error occurred during the upload. Please try again.');
        } finally {
            setUploading(false);
        }
    };


    return (
        <div onClick={()=>setModal(false)} className={` ${modal ? 'scale-100' : 'scale-0'} fixed inset-0 bg-black bg-opacity-20 transform transition-transform duration-300 justify-center items-center flex p-4 z-50`}>
            <div onClick={e=>e.stopPropagation()} className="bg-background relative p-8 rounded-lg w-full sm:w-[500px]" >
                <FaRegTimesCircle onClick={()=>setModal(false)} size={24} className="text-gray-500 absolute top-6 right-6 z-20 "/>

                <div className="relative border border-dashed border-gray-400 rounded-md p-8 flex flex-col items-center">
                    <input
                    type="file"
                    
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
                    className={ `${selectedFiles.length === 0 ? ' bg-zinc-300 text-zinc-400 cursor-not-allowed ' : 'hover-green'} w-60 text-center mt-4   px-4 py-3 rounded-md`}
                >
                    {uploading ? <BtnSpinner /> : 'Upload Images'}
                </button>
                {uploadError && <p className="mt-2 text-red-500">{uploadError}</p>}

            </div>
        </div>
    )
}