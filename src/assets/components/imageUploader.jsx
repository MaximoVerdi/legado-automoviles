import { useState } from "react";

const ImageUploader = ({ onUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validación mejorada del archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError("Solo se permiten imágenes (JPEG, PNG, WEBP, GIF)");
      return;
    }

    // Límite de tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("La imagen no debe superar los 5MB");
      return;
    }

    setUploading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET);
    formData.append("api_key", import.meta.env.VITE_APP_CLOUDINARY_API_KEY);
    formData.append("cloud_name", import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.secure_url) {
        throw new Error("No se recibió URL de imagen válida desde Cloudinary");
      }

      onUpload(data.secure_url);
      
    } catch (error) {
      console.error("Error detallado en la subida:", {
        error: error.message,
        preset: import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET,
        apiKey: import.meta.env.VITE_APP_CLOUDINARY_API_KEY ? "***" : "NO DEFINIDA",
        cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
      });
      setError(`Error al subir: ${error.message}`);
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
          accept="image/jpeg, image/png, image/webp, image/gif"
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>
      
      {error && <div className="upload-error">{error}</div>}

      {uploading && (
        <div className="upload-progress">
          <div className="progress-bar"></div>
        </div>
      )}

      <style jsx>{`
        .upload-label {
          display: inline-block;
          padding: 10px 20px;
          background: #3182ce;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }
        .upload-label:hover {
          background: #2c5282;
        }
        .upload-label.uploading {
          background: #718096;
          cursor: wait;
        }
        .upload-error {
          color: #e53e3e;
          margin-top: 8px;
          font-size: 14px;
        }
        .upload-progress {
          margin-top: 8px;
          height: 4px;
          background: #edf2f7;
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          width: 0%;
          background: #4299e1;
          animation: progress 2s ease-in-out infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ImageUploader