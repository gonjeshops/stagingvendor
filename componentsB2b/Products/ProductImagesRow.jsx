

const ProductImagesRow = ({ images, activeIndex, onImageClick }) => {
  return (
    <div className="flex flex-row overflow-x-auto mt-4">
      
        {images.map((image, index) => (
            <div className="">
            <div
            key={index}
            className={`w-20 h-20 flex items-center justify-center border ${
                activeIndex === index ? 'border-orange-500' : 'border-gray-200 hover:border-orange-500 duration-300'
            } mr-2 cursor-pointer`}
            onClick={() => onImageClick(index)}

            >
                {image}
            {/* <img src={image} alt={`Variation ${index + 1}`} className="max-h-full" /> */}
            </div>
            </div>
        ))}
  
    </div>
  );
};

export default ProductImagesRow;
