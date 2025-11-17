import { Button } from "@/components/ui/button";
import { Leaf, ShieldCheck, Microscope, Bot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/placeholder-images";

export default function Home() {
  const heroImage = getPlaceholderImage("hero");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold font-headline">CropDoc AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            How It Works
          </Link>
          <Link href="/login">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Protect Your Harvest with AI-Powered Insights
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    CropDoc AI helps you diagnose crop diseases instantly, get treatment advice, and monitor your farm's health proactively.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg">Start for Free</Button>
                  </Link>
                </div>
              </div>
              {heroImage && <Image
                src={heroImage.imageUrl}
                width={600}
                height={400}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />}
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Smarter Farming, Healthier Crops</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides a comprehensive suite of tools to help you stay ahead of crop diseases and optimize your farm's productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Microscope className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold font-headline">Instant Diagnosis</h3>
                <p className="text-sm text-muted-foreground">Upload a photo of your crop to get an AI-powered disease diagnosis in seconds.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold font-headline">AI-Driven Recommendations</h3>
                <p className="text-sm text-muted-foreground">Receive tailored treatment and prevention strategies based on the diagnosis and local environmental data.</p>
              </div>
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold font-headline">Proactive Alerts</h3>
                <p className="text-sm text-muted-foreground">Get notified about potential disease outbreaks based on real-time weather and IoT data from your farm.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Simple Steps to a Healthier Harvest</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Follow our easy three-step process to start protecting your crops today.
              </p>
            </div>
            <div className="flex space-x-4">
              <ol className="grid gap-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <div>
                    <h3 className="font-bold font-headline">Upload Image</h3>
                    <p className="text-muted-foreground">Snap a picture of the affected crop and upload it to our platform.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <div>
                    <h3 className="font-bold font-headline">Get Diagnosis</h3>
                    <p className="text-muted-foreground">Our AI analyzes the image and provides a detailed diagnosis and severity assessment.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">3</div>
                  <div>
                    <h3 className="font-bold font-headline">Take Action</h3>
                    <p className="text-muted-foreground">Follow the recommended treatment plans and preventative measures to protect your crops.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CropDoc AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
