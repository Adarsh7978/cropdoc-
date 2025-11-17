
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon, Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { diagnoseCropDisease, DiagnoseCropDiseaseOutput } from "@/ai/flows/diagnose-crop-disease";
import { recommendTreatment, RecommendTreatmentOutput } from "@/ai/flows/recommend-treatment";
import { DiagnosisResult } from "@/components/diagnosis-result";

export default function UploadPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{diagnosis: DiagnoseCropDiseaseOutput, treatment: RecommendTreatmentOutput} | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const showToast = useCallback((...args: Parameters<typeof toast>) => {
    toast(...args);
  }, [toast]);

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
        showToast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use the camera feature.",
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [showToast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
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
        setResult(null);
      }
    }
  };
  
  const handleDiagnose = async () => {
    if (!selectedImage) {
        toast({ title: "Error", description: "Please select an image first.", variant: "destructive" });
        return;
    }
    
    setIsLoading(true);
    setResult(null);

    try {
        // Step 1: Diagnose Disease
        const diagnosis = await diagnoseCropDisease({ photoDataUri: selectedImage });

        // Step 2: Get Treatment Recommendation (with mock environmental data)
        const treatment = await recommendTreatment({
            diseaseName: diagnosis.diseaseName,
            severityLevel: diagnosis.severityLevel,
            cropType: "Unknown", // No crop type selection on this page
            temperature: 28, // Mock data
            humidity: 75, // Mock data
            soilMoisture: 45, // Mock data
        });
        
        setResult({ diagnosis, treatment });
    } catch (error) {
      console.error(error);
      toast({
        title: "Diagnosis Failed",
        description: "An error occurred while analyzing the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const reset = () => {
    setSelectedImage(null);
    setResult(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 gap-4 min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <h3 className="text-xl font-semibold font-headline">Analyzing your crop...</h3>
            <p className="text-muted-foreground">Our AI is hard at work. This may take a moment.</p>
        </div>
    );
  }

  if (result && selectedImage) {
    return <DiagnosisResult result={result} onReset={reset} imagePreview={selectedImage} />;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Upload Image for Diagnosis</h2>
        <p className="text-muted-foreground">
          Take a photo with your camera or upload an image from your device to get an instant AI diagnosis.
        </p>
      </div>
      {!selectedImage ? (
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ImageIcon className="w-6 h-6" /> Image Ready for Diagnosis</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <Image
              src={selectedImage}
              alt="Selected"
              width={500}
              height={500}
              className="rounded-md object-contain max-h-[500px]"
            />
            <div className="flex gap-4">
                <Button variant="outline" onClick={reset}>Choose a different image</Button>
                <Button size="lg" onClick={handleDiagnose}>Diagnose Now</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
