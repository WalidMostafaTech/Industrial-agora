import { useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";

const ImageUploader = ({
  label = "Upload Images",
  onChange,
  error,
  initialImages = [],
}) => {
  const [images, setImages] = useState(initialImages);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    const updatedImages = [...images, ...previews];
    setImages(updatedImages);
    onChange(updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onChange(updated);
  };

  return (
    <div>
      <p className="font-medium text-gray-900 mb-2">{label}</p>

      {/* Upload Button */}
      <label
        htmlFor="product_images"
        className="w-40 h-40 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-myBlue-2 hover:bg-gray-50 transition"
      >
        <FiCamera className="text-3xl text-gray-500" />
        <span className="text-gray-500 text-sm">Upload Images</span>
        <input
          id="product_images"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleImagesChange}
        />
      </label>

      {/* Preview Images */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className="relative group w-full aspect-square">
              <img
                src={img.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-xl border border-myBlue-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow-md opacity-0 cursor-pointer group-hover:opacity-100 transition"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default ImageUploader;
