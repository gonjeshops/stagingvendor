import Image from "next/image";


const ProductImagesRow = ({ images, activeIndex, onImageClick }) => {
  return (
    <div className="flex flex-row overflow-x-auto mt-4 gap-2">
      
        {images.map(({id, thumbnail, original}, index) => (
            <div key={index} className="">
            <div
            className={`w-20 h-20 overflow-hidden flex items-center border-2 justify-center  ${
                activeIndex === index ? 'border-orange-500' : 'border-gray-400 hover:border-orange-500 duration-300'
            } mr-2 cursor-pointer`}
            onClick={() => onImageClick(index)}

            >
              <Image width={50} height={50} src={thumbnail} alt={`Variation ${index + 1}`} className="h-full w-full object-cover" />
            </div>
            </div>
        ))}
  
    </div>
  );
};

export default ProductImagesRow;
