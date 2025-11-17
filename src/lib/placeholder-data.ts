import { getPlaceholderImage } from "./placeholder-images";

export const diagnosisHistory = [
  {
    id: 1,
    imageUrl: getPlaceholderImage("hist1")?.imageUrl || "",
    diseaseName: "Tomato Late Blight",
    severityLevel: "High",
    date: "2024-07-18",
    confidenceScore: 0.95,
  },
  {
    id: 2,
    imageUrl: getPlaceholderImage("hist2")?.imageUrl || "",
    diseaseName: "Corn Common Rust",
    severityLevel: "Medium",
    date: "2024-07-15",
    confidenceScore: 0.82,
  },
  {
    id: 3,
    imageUrl: getPlaceholderImage("hist3")?.imageUrl || "",
    diseaseName: "Potato Early Blight",
    severityLevel: "High",
    date: "2024-07-12",
    confidenceScore: 0.98,
  },
  {
    id: 4,
    imageUrl: getPlaceholderImage("hist4")?.imageUrl || "",
    diseaseName: "Healthy",
    severityLevel: "Low",
    date: "2024-07-10",
    confidenceScore: 0.99,
  },
   {
    id: 5,
    imageUrl: getPlaceholderImage("hist5")?.imageUrl || "",
    diseaseName: "Apple Scab",
    severityLevel: "Medium",
    date: "2024-07-08",
    confidenceScore: 0.76,
  },
];

export const environmentData = [
  { name: '12 AM', temperature: 22, humidity: 65, soilMoisture: 40 },
  { name: '3 AM', temperature: 21, humidity: 68, soilMoisture: 42 },
  { name: '6 AM', temperature: 20, humidity: 75, soilMoisture: 45 },
  { name: '9 AM', temperature: 24, humidity: 70, soilMoisture: 43 },
  { name: '12 PM', temperature: 28, humidity: 60, soilMoisture: 38 },
  { name: '3 PM', temperature: 30, humidity: 55, soilMoisture: 35 },
  { name: '6 PM', temperature: 27, humidity: 62, soilMoisture: 37 },
  { name: '9 PM', temperature: 24, humidity: 68, soilMoisture: 39 },
];
