import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export default function LoginPage() {
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
                <h1 className="text-3xl font-bold font-headline">Login</h1>
                <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                />
                </div>
                <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                    >
                    Forgot your password?
                    </Link>
                </div>
                <Input id="password" type="password" required />
                </div>
                <Link href="/dashboard" className="w-full">
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </Link>
            </div>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                Sign up
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
