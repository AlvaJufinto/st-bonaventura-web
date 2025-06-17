import { useRef, useState } from "react";

import { useForm } from "@inertiajs/react";

export default function ProfilePictureUpload({ user, onUploadSuccess }) {
  const ASSET_URL = import.meta.env.VITE_PUBLIC_ASSET_URL;

  const [preview, setPreview] = useState(
    user.profile_picture ? `${ASSET_URL}/uploads/${user.profile_picture}` : null
  );
  console.log("🚀 ~ ProfilePictureUpload ~ preview:", preview);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const { data, setData, post, processing, errors, reset } = useForm({
    profile_picture: null,
  });

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setData("profile_picture", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!data.profile_picture) return;

    post(route("user.upload-profile-picture", user.id), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      },
    });
  };

  const handleRemove = () => {
    post(route("user.remove-profile-picture", user.id), {
      onSuccess: () => {
        setPreview(null);
        setData("profile_picture", null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      },
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium text-gray-900 mb-4 font-secondary">
        Profile Picture
      </h3>

      <div className="flex flex-col items-center space-y-4">
        {/* Current Profile Picture or Placeholder */}
        <div className="relative">
          <div className="w-64 h-72 overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>

          {user?.profile_picture && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
              title="Remove profile picture"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div
          className={`w-full max-w-md border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            />
          </svg>
          <div className="mt-4">
            <p className="text-sm text-gray-600 font-secondary">
              <button
                type="button"
                onClick={triggerFileInput}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition-colors"
              >
                Click to upload
              </button>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1 font-secondary">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Error Display */}
        {errors.profile_picture && (
          <div className="text-red-600 text-sm font-secondary">
            {errors.profile_picture}
          </div>
        )}

        {/* Upload Button */}
        {data.profile_picture && (
          <form onSubmit={handleUpload} className="w-full max-w-md">
            <button
              type="submit"
              disabled={processing}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-secondary"
            >
              {processing ? "Uploading..." : "Upload Profile Picture"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
