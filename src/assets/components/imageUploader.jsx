import { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dm39iqvoh",
  },
});

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validación básica del archivo
    if (!file.type.match('image.*')) {
      setError("Solo se permiten archivos de imagen");
      return;
    }

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dm39iqvoh/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Error ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.secure_url) {
        throw new Error("La respuesta de Cloudinary no incluyó URL de imagen");
      }

      onUpload(data.secure_url);
      
    } catch (error) {
      console.error("Error en la subida:", error);
      setError(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="uploader-container">
      <label className={`upload-label ${uploading ? 'uploading' : ''}`}>
        {uploading ? "Subiendo..." : "Seleccionar imagen"}
        <input 
          type="file" 
          onChange={handleUpload}
          accept="image/*"
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>
      
      {error && <div className="upload-error">{error}</div>}

      <style>{`
        .upload-label {
          display: inline-block;
          padding: 8px 16px;
          background: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .upload-label:hover {
          background: #0061d5;
        }
        .upload-label.uploading {
          background: #666;
          cursor: wait;
        }
        .upload-error {
          color: red;
          margin-top: 8px;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default ImageUploader;