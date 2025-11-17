"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { diagnoseCropDisease, DiagnoseCropDiseaseOutput } from "@/ai/flows/diagnose-crop-disease";
import { recommendTreatment, RecommendTreatmentOutput } from "@/ai/flows/recommend-treatment";
import { DiagnosisResult } from "./diagnosis-result";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";


const formSchema = z.object({
  image: z.any().refine(file => file, "Image is required."),
  cropType: z.string().min(1, "Crop type is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function DiagnosisForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{diagnosis: DiagnoseCropDiseaseOutput, treatment: RecommendTreatmentOutput} | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.image) {
        toast({ title: "Error", description: "Please upload an image.", variant: "destructive" });
        return;
    }
    
    setIsLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(data.image);
      reader.onloadend = async () => {
        const base64data = reader.result as string;

        // Step 1: Diagnose Disease
        const diagnosis = await diagnoseCropDisease({ photoDataUri: base64data });

        // Step 2: Get Treatment Recommendation (with mock environmental data)
        const treatment = await recommendTreatment({
            diseaseName: diagnosis.diseaseName,
            severityLevel: diagnosis.severityLevel,
            cropType: data.cropType,
            temperature: 28, // Mock data
            humidity: 75, // Mock data
            soilMoisture: 45, // Mock data
        });
        
        setResult({ diagnosis, treatment });
      };
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

  const clearPreview = () => {
    setPreview(null);
    form.setValue('image', null);
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
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

  if (result) {
    return <DiagnosisResult result={result} onReset={() => { setResult(null); clearPreview(); form.reset(); }} imagePreview={preview!} />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Crop Image</CardTitle>
        <CardDescription>
          For best results, use a clear, well-lit photo of the affected area.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="image-upload" className="mb-2 block">Crop Image</Label>
                        <div className="relative flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
                            {preview ? (
                            <>
                                <Image src={preview} alt="Preview" fill className="object-contain rounded-lg p-2" />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2 h-7 w-7 rounded-full"
                                    onClick={clearPreview}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </>
                            ) : (
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-2 text-sm text-muted-foreground">
                                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                            </div>
                            )}
                            <Input
                            id="image-upload"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handleImageChange}
                            />
                        </div>
                         {form.formState.errors.image && <p className="text-sm font-medium text-destructive mt-2">{form.formState.errors.image.message as string}</p>}
                    </div>

                    <div className="space-y-6">
                        <FormField
                            control={form.control}
                            name="cropType"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Crop Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select the crop type" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="Corn">Corn</SelectItem>
                                    <SelectItem value="Wheat">Wheat</SelectItem>
                                    <SelectItem value="Tomato">Tomato</SelectItem>
                                    <SelectItem value="Potato">Potato</SelectItem>
                                    <SelectItem value="Apple">Apple</SelectItem>
                                    <SelectItem value="Grape">Grape</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div>
                            <h4 className="font-medium mb-2">Simulated Environment</h4>
                            <div className="p-4 rounded-lg border bg-secondary/50 space-y-2 text-sm">
                                <p><strong>Temperature:</strong> 28°C (Mock)</p>
                                <p><strong>Humidity:</strong> 75% (Mock)</p>
                                <p><strong>Soil Moisture:</strong> 45% (Mock)</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">In a real application, this data would come from live sensors.</p>
                        </div>
                    </div>
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto" disabled={!preview}>
                    Diagnose Now
                </Button>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}
