"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, Upload, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isProcessing?: boolean;
  className?: string;
  maxSize?: number; // in MB
}

export function ImageUploader({
  onImageSelect,
  isProcessing = false,
  className,
  maxSize = 5, // Default 5MB
}: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      setError("Please upload a valid image (JPEG, PNG, or WebP)");
      return false;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }
    
    return true;
  };

  const processFile = (file: File) => {
    if (validateFile(file)) {
      setError(null);
      setPreviewUrl(URL.createObjectURL(file));
      onImageSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const resetUpload = () => {
    setPreviewUrl(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <AnimatePresence mode="wait">
        {!previewUrl ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "upload-zone border-2 border-dashed rounded-xl p-8 text-center transition-colors",
              dragActive ? "border-bb-primary bg-bb-primary/10" : "border-border",
              className
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleChange}
            />
            
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="bg-muted h-16 w-16 rounded-full flex items-center justify-center">
                <Camera size={28} className="text-muted-foreground" />
              </div>
              
              <div className="space-y-1">
                <p className="text-lg font-medium">Upload your meal photo</p>
                <p className="text-sm text-muted-foreground">
                  Drag and drop or click to browse
                </p>
              </div>
              
              <Button
                type="button"
                onClick={handleButtonClick}
                className="mt-2 bg-bb-primary hover:bg-bb-primary/90"
              >
                <Upload size={16} className="mr-2" />
                Select Image
              </Button>
              
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: JPEG, PNG, WebP (max {maxSize}MB)
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative rounded-xl overflow-hidden"
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl"
            />
            
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              {isProcessing ? (
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex flex-col items-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                  <p className="text-white mt-2">Analyzing your meal...</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    size="icon" 
                    className="rounded-full bg-white/20 hover:bg-white/30"
                    onClick={resetUpload}
                  >
                    <X size={20} className="text-white" />
                  </Button>
                  <Button 
                    className="rounded-full bg-bb-primary hover:bg-bb-primary/90"
                  >
                    <Check size={20} className="mr-1" /> Confirm
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-bb-error mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}