
# CropDoc AI: AI-Powered Crop Disease Diagnosis

CropDoc AI is a web application designed to help farmers and agricultural professionals quickly diagnose crop diseases, get treatment recommendations, and monitor their farm's health proactively. By leveraging the power of generative AI, CropDoc AI provides instant insights from just an image of a plant.

![CropDoc AI Screenshot](https://storage.googleapis.com/aip-dev-demos-internal-apps-images/crop-doc-ai-screenshot.png)

## ✨ Key Features

-   **Instant AI Diagnosis**: Upload a photo of a crop to get an AI-powered disease diagnosis with a confidence score and severity level.
-   **Quick & Detailed Diagnosis**: Choose between a quick diagnosis by just uploading an image, or a more detailed diagnosis by providing additional information like crop type.
-   **AI-Driven Treatment Advice**: Receive tailored treatment and prevention strategies based on the diagnosis, crop type, and environmental data (mocked for this demo).
-   **AI Expert Consultation**: Engage in a real-time conversation with an AI agricultural expert to get personalized advice and answers to your farming questions.
-   **Dashboard Overview**: A central dashboard to view key metrics like total diagnoses, overall plant health, and active alerts.
-   **Diagnosis History**: Keep track of all past diagnoses to monitor disease trends and treatment effectiveness over time.
-   **Environment Monitor**: A chart that visualizes mock environmental data like temperature, humidity, and soil moisture over the last 24 hours.

## 🚀 Technology Stack

This project is built with a modern, AI-first tech stack:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **AI Integration**: [Genkit (by Firebase)](https://firebase.google.com/docs/genkit)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cropdoc-ai.git
    cd cropdoc-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```
    *Note: The Genkit configuration in `src/ai/genkit.ts` is set up to use this environment variable.*


4.  **Run the development server:**
    The application requires two processes to run concurrently: the Next.js frontend and the Genkit AI flows.

    -   In your first terminal, start the Next.js development server:
        ```bash
        npm run dev
        ```
        This will start the web application on `http://localhost:9002`.

    -   In a second terminal, start the Genkit development server:
        ```bash
        npm run genkit:watch
        ```
        This will start the Genkit flows and allow for hot-reloading as you make changes to your AI logic.

You should now be able to access the application in your browser and use all of its features.

## 📂 Project Structure

```
.
├── src
│   ├── app         # Next.js App Router pages and layouts
│   ├── components  # Reusable React components (including Shadcn UI)
│   ├── ai          # All AI-related code using Genkit
│   │   ├── flows       # Genkit flows for diagnosis, treatment, and chat
│   │   └── schemas     # Zod schemas for AI flow inputs/outputs
│   ├── lib         # Utility functions and placeholder data
│   └── hooks       # Custom React hooks
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.ts     # Next.js configuration
```
