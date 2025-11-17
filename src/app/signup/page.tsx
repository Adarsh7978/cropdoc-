
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export default function SignupPage() {
  const authImage = getPlaceholderImage("auth-bg");

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
       <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">CropDoc AI</span>
            </Link>
            <h1 className="text-3xl font-bold font-headline">Sign Up</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., M.P., India" required />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="cropType">Primary Crop Type</Label>
              <Select>
                <SelectTrigger id="cropType">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corn">Corn</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Link href="/dashboard" className="w-full">
                <Button type="submit" className="w-full">
                Create an account
                </Button>
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
       <div className="hidden bg-muted lg:block relative">
        {authImage && <Image
          src={authImage.imageUrl}
          alt={authImage.description}
          data-ai-hint={authImage.imageHint}
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />}
        <div className="absolute bottom-8 left-8 right-8 p-6 bg-background/80 backdrop-blur-sm rounded-lg">
            <blockquote className="text-lg font-medium">
            “The ultimate goal of farming is not the growing of crops, but the cultivation and perfection of human beings.”
            </blockquote>
            <footer className="text-sm text-muted-foreground mt-2">- Masanobu Fukuoka</footer>
        </div>
      </div>
    </div>
  );
}
