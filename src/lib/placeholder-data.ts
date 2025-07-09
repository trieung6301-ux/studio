export interface Product {
  id: string;
  name: string;
  category: "Protein" | "Pre-Workout" | "Vitamins" | "Creatine";
  brand: "Optimum Nutrition" | "MyProtein" | "GymShark" | "Bulk";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Gold Standard Whey",
    category: "Protein",
    brand: "Optimum Nutrition",
    price: 59.99,
    rating: 5,
    reviews: 1250,
    image: "https://placehold.co/600x400.png",
    description: "The world's best-selling whey protein powder.",
  },
  {
    id: "2",
    name: "C4 Original Pre-Workout",
    category: "Pre-Workout",
    brand: "GymShark",
    price: 29.99,
    rating: 4,
    reviews: 890,
    image: "https://placehold.co/600x400.png",
    description: "Explosive energy, heightened focus, and an overwhelming urge to tackle any challenge.",
  },
  {
    id: "3",
    name: "Opti-Men Multivitamin",
    category: "Vitamins",
    brand: "Optimum Nutrition",
    price: 24.99,
    rating: 5,
    reviews: 740,
    image: "https://placehold.co/600x400.png",
    description: "High-potency multivitamin for active men.",
  },
  {
    id: "4",
    name: "Creatine Monohydrate",
    category: "Creatine",
    brand: "MyProtein",
    price: 19.99,
    rating: 4,
    reviews: 1500,
    image: "https://placehold.co/600x400.png",
    description: "Pure creatine monohydrate to increase physical performance.",
  },
  {
    id: "5",
    name: "Impact Whey Isolate",
    category: "Protein",
    brand: "MyProtein",
    price: 49.99,
    rating: 5,
    reviews: 980,
    image: "https://placehold.co/600x400.png",
    description: "Super-pure isolate, with over 90% protein content.",
  },
  {
    id: "6",
    name: "The Pre-Workout",
    category: "Pre-Workout",
    brand: "MyProtein",
    price: 34.99,
    rating: 4,
    reviews: 650,
    image: "https://placehold.co/600x400.png",
    description: "A powerful blend of ingredients to fuel your workout.",
  },
   {
    id: "7",
    name: "Creatine Monohydrate Powder",
    category: "Creatine",
    brand: "Bulk",
    price: 22.99,
    rating: 5,
    reviews: 1100,
    image: "https://placehold.co/600x400.png",
    description: "Micronized creatine powder for improved absorption and performance.",
  },
  {
    id: "8",
    name: "Legacy Pre-Workout",
    category: "Pre-Workout",
    brand: "GymShark",
    price: 39.99,
    rating: 5,
    reviews: 450,
    image: "https://placehold.co/600x400.png",
    description: "The ultimate pre-workout for energy, focus, and pump.",
  },
  {
    id: "9",
    name: "Pure Whey Protein",
    category: "Protein",
    brand: "Bulk",
    price: 45.99,
    rating: 4,
    reviews: 880,
    image: "https://placehold.co/600x400.png",
    description: "High-quality whey protein concentrate from grass-fed cows.",
  },
];

export const categories = [...new Set(products.map(p => p.category))];
export const brands = [...new Set(products.map(p => p.brand))];


export interface FAQ {
    question: string;
    answer: string;
}

export const faqs: FAQ[] = [
    {
        question: "What is whey protein?",
        answer: "Whey protein is a mixture of proteins isolated from whey, the liquid part of milk that separates during cheese production. It's a complete, high-quality protein, containing all of the essential amino acids."
    },
    {
        question: "When should I take pre-workout?",
        answer: "It's best to take pre-workout supplements about 30-60 minutes before you start your workout. This gives the ingredients, like caffeine, enough time to kick in."
    },
    {
        question: "Is creatine safe?",
        answer: "Creatine is one of the most well-researched supplements available and is considered safe for most people when taken at recommended dosages. It helps muscles produce energy during heavy lifting or high-intensity exercise."
    },
    {
        question: "Do I need a multivitamin if I eat a healthy diet?",
        answer: "While a balanced diet is key, a multivitamin can help fill in nutritional gaps, especially for active individuals who may have higher nutrient needs. It acts as an insurance policy for your diet."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout for faster delivery."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on all unopened products. If you are not satisfied with your purchase, please contact our support team to initiate a return."
    }
];
