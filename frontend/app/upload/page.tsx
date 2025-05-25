"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Reset states
      setLoading(false);
      setSuccess(false);
      setError(null);

      // Check file type
      if (!file.type.includes("image")) {
        setError("Please upload an image file");
        return;
      }

      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size should be less than 10MB");
        return;
      }

      setFile(file); // <-- ADD THIS LINE

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Redirect to summary page after success
      setTimeout(() => {
        window.location.href = "/summary";
      }, 1500);
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setImage(null);
    setSuccess(false);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("photo", file);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/photo/upload-daily`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );
    const data = await res.json();
    if (data.success) {
      toast({ title: "Photo uploaded!" });
      setFile(null);
    } else {
      toast({
        title: "Error",
        description: data.message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="container py-8 md:py-12"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div className="max-w-2xl mx-auto" variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Upload Your Meal
          </h1>
          <p className="text-muted-foreground">
            Take a photo or upload an image of your meal to get detailed
            nutrition information.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card className="p-6 md:p-8 bg-white/90 shadow-2xl rounded-2xl">
            <div className="space-y-6">
              {/* Step 1: Upload/Take Photo */}
              {!image && (
                <div
                  className="relative border-2 border-dashed border-muted rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/20 transition-colors"
                  onClick={triggerFileInput}
                >
                  <div className="bg-primary/10 rounded-full p-4 mb-4">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">
                    Upload Meal Image
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Drag and drop an image here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports: JPEG, PNG, WEBP up to 10MB
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant="secondary"
                    className="mt-4 w-full sm:hidden"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.capture = "environment";
                        fileInputRef.current.click();
                      }
                    }}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo with Camera
                  </Button>
                </div>
              )}

              {/* Step 2: Preview & Confirm */}
              {image && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] w-full max-w-md mx-auto shadow">
                    <Image
                      src={image}
                      alt="Meal preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-3 right-3 rounded-full"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button
                      variant="outline"
                      onClick={triggerFileInput}
                      className="flex-1"
                      disabled={loading || success}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Another Image
                    </Button>
                    <Button
                      onClick={handleAnalyze}
                      className={cn("flex-1", {
                        "bg-mint-green hover:bg-mint-green/90": success,
                      })}
                      disabled={!image || loading || success}
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {success && <CheckCircle2 className="mr-2 h-4 w-4" />}
                      {!loading && !success && "Analyze Meal"}
                      {loading && "Analyzing..."}
                      {success && "Success!"}
                    </Button>
                  </div>
                  <Button
                    onClick={handleUpload}
                    className="w-full"
                    disabled={!image || loading}
                    variant="default"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-3 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div variants={fadeInUp} className="mt-8">
          <h3 className="text-lg font-medium mb-3">Tips for Better Results:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                <CheckCircle2 className="h-3 w-3 text-primary" />
              </span>
              Take photos in good lighting for better food recognition
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                <CheckCircle2 className="h-3 w-3 text-primary" />
              </span>
              Capture the entire plate to help with portion estimation
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                <CheckCircle2 className="h-3 w-3 text-primary" />
              </span>
              Include standard objects like utensils for size reference
            </li>
            <li className="flex items-start">
              <span className="bg-primary/20 rounded-full p-1 mr-2 mt-0.5">
                <CheckCircle2 className="h-3 w-3 text-primary" />
              </span>
              Try to separate different food items on the plate when possible
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
