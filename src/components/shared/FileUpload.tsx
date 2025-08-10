import React, { useState, useRef } from "react";
import { useFileUpload } from "../../hooks/useFileUpload";

interface FileUploadProps {
  type: "profile-picture" | "resume" | "general";
  onUploadSuccess: (fileUrl: string, fileName: string) => void;
  onUploadError?: (error: string) => void;
  currentFile?: string;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  required?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  type,
  onUploadSuccess,
  onUploadError,
  currentFile,
  accept,
  maxSize = 5, // 5MB default
  label,
  required = false,
  className = "",
}) => {
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { upload, isUploading, error, reset } = useFileUpload({
    type,
    onSuccess: (fileUrl: string, fileName: string) => {
      if (type === "profile-picture") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(new File([], fileName));
      }
      onUploadSuccess(fileUrl, fileName);
    },
    onError: onUploadError,
  });

  const getDefaultAccept = () => {
    switch (type) {
      case "profile-picture":
        return "image/*";
      case "resume":
        return ".pdf,.doc,.docx";
      default:
        return accept || "*/*";
    }
  };

  const handleFileSelect = async (file: File) => {
    await upload(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onUploadSuccess("", "");
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={getDefaultAccept()}
          onChange={handleInputChange}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : preview && type === "profile-picture" ? (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-gray-200"
            />
            <p className="text-sm text-gray-600 mb-2">Click to change image</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove image"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {type === "profile-picture" && "PNG, JPG, GIF up to 2MB"}
              {type === "resume" && "PDF, DOC, DOCX up to 10MB"}
              {type === "general" && `Files up to ${maxSize}MB`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
