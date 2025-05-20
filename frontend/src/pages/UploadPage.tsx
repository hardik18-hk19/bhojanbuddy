import React, { useState } from 'react';
import { Camera, Upload, X, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTakePhoto = () => {
    // In a real app, this would access the camera
    const fileInput = document.getElementById('photo-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleReset = () => {
    setImage(null);
    setUploading(false);
    setProcessing(false);
  };

  const handleAnalyze = () => {
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setProcessing(true);
      
      // Simulate processing
      setTimeout(() => {
        setProcessing(false);
        navigate('/nutrition');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="py-6 space-y-6">
      <section className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2">Upload Your Meal</h1>
        <p className="text-white/80">Take a photo or upload an image of your food</p>
      </section>

      <section className="flex flex-col items-center">
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {!image ? (
          <div className="w-full max-w-xs">
            <div 
              className="border-2 border-dashed border-primary-green/50 rounded-xl p-8 mb-4 flex flex-col items-center justify-center bg-primary-green/5 h-64"
            >
              <Upload className="text-primary-green mb-3" size={40} />
              <p className="text-white/70 text-center mb-2">Tap to upload a photo of your meal</p>
              <p className="text-xs text-white/50 text-center">For best results, ensure the food is clearly visible</p>
            </div>

            <div className="flex space-x-4">
              <button 
                onClick={handleTakePhoto}
                className="flex-1 bg-primary-green text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:bg-primary-green/90 transition-colors"
              >
                <Camera size={20} className="mr-2" />
                Take Photo
              </button>
              
              <button 
                onClick={() => document.getElementById('photo-upload')?.click()}
                className="flex-1 bg-white/10 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
              >
                <Upload size={20} className="mr-2" />
                Upload
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xs">
            <div className="relative mb-4">
              <img 
                src={image} 
                alt="Meal preview" 
                className="w-full h-64 object-cover rounded-xl border border-primary-green/30"
              />
              
              {!uploading && !processing && (
                <button 
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-forest-green/80 p-1.5 rounded-full text-white hover:bg-forest-green transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              
              {(uploading || processing) && (
                <div className="absolute inset-0 bg-forest-green/70 flex flex-col items-center justify-center rounded-xl">
                  <RefreshCw size={40} className="animate-spin text-vibrant-yellow mb-3" />
                  <p className="text-white font-medium">
                    {uploading ? 'Uploading...' : 'Analyzing your meal...'}
                  </p>
                </div>
              )}
            </div>
            
            {!uploading && !processing && (
              <button 
                onClick={handleAnalyze}
                className="w-full bg-vibrant-yellow text-forest-green font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-vibrant-yellow/90 transition-colors"
              >
                Analyze My Meal
              </button>
            )}
          </div>
        )}
      </section>

      <section className="bg-primary-green/10 rounded-xl p-4 border border-primary-green/30 mt-8">
        <h2 className="text-lg font-semibold mb-2">Tips for Better Results</h2>
        <ul className="text-sm space-y-2 text-white/80">
          <li className="flex items-start">
            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">1</span>
            <span>Ensure good lighting when taking photos</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">2</span>
            <span>Position the camera directly above the food</span>
          </li>
          <li className="flex items-start">
            <span className="bg-primary-green text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">3</span>
            <span>Include all items of your meal in the frame</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UploadPage;