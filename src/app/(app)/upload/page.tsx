
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, Camera } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use the camera feature.",
        });
      }
    };

    getCameraPermission();

    return () => {
        // Cleanup function to stop video stream
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL("image/png");
        setSelectedImage(dataUrl);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Upload Image</h2>
        <p className="text-muted-foreground">
          Take a photo with your camera or upload an image from your device.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Camera className="w-6 h-6"/> Use Camera</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full aspect-video bg-secondary rounded-md overflow-hidden flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            {hasCameraPermission === false && (
                <Alert variant="destructive">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                        Please allow camera access to use this feature. You might need to change permissions in your browser settings.
                    </AlertDescription>
                </Alert>
            )}
            <Button onClick={handleCapture} className="w-full" disabled={!hasCameraPermission}>
              <Camera className="mr-2" />
              Take Picture
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload className="w-6 h-6"/> Upload from Device</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center items-center w-full h-full">
              <Label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                </div>
                <Input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </Label>
            </div>
             <Button className="w-full" onClick={() => fileInputRef.current?.click()}>
                Choose File
            </Button>
          </CardContent>
        </Card>
      </div>
      {selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="w-6 h-6" /> Uploaded Image</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={500}
              className="rounded-md object-contain max-h-[500px]"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
