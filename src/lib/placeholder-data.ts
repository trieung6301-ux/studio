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

export interface MembershipPlan {
  id: string;
  title: string;
  price: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  isPopular: boolean;
  discount?: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'plan-monthly',
    title: 'Monthly',
    price: 49,
    period: 'monthly',
    features: [
      'Full gym access',
      'Access to all group classes',
      'Locker room access',
      'No commitment',
    ],
    isPopular: false,
  },
  {
    id: 'plan-quarterly',
    title: 'Quarterly',
    price: 40,
    period: 'quarterly',
    features: [
      'All monthly benefits',
      '1 free personal training session',
      'Free merchandise item',
      'Guest pass each month',
    ],
    isPopular: true,
    discount: 'Save 18%',
  },
  {
    id: 'plan-yearly',
    title: 'Yearly',
    price: 35,
    period: 'yearly',
    features: [
      'All quarterly benefits',
      'Unlimited guest passes',
      '20% off all supplements',
      'Personalized workout plan',
    ],
    isPopular: false,
    discount: 'Save 30%',
  },
];


export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export const weeklyWorkoutPlan: Record<string, Exercise[]> = {
  monday: [
    { id: '1', name: 'Bench Press', sets: '4', reps: '8-12', weight: '80' },
    { id: '2', name: 'Squat', sets: '4', reps: '8-12', weight: '100' },
    { id: '3', name: 'Deadlift', sets: '3', reps: '5-8', weight: '120' },
  ],
  tuesday: [],
  wednesday: [
    { id: '4', name: 'Overhead Press', sets: '4', reps: '8-12', weight: '50' },
    { id: '5', name: 'Barbell Row', sets: '4', reps: '8-12', weight: '70' },
    { id: '6', name: 'Pull Ups', sets: '3', reps: 'To failure', weight: 'Bodyweight' },
  ],
  thursday: [],
  friday: [
    { id: '7', name: 'Incline Dumbbell Press', sets: '4', reps: '10-15', weight: '30' },
    { id: '8', name: 'Leg Press', sets: '4', reps: '10-15', weight: '150' },
    { id: '9', name: 'Bicep Curls', sets: '3', reps: '10-15', weight: '15' },
  ],
  saturday: [],
  sunday: [],
};

export interface PersonalTrainer {
  id: string;
  name: string;
  specialties: string[];
  description: string;
  image: string;
  packages: {
    session: {
      price: number;
    };
    monthly: {
      price: number;
    };
  };
  availability: string[];
}

export const ptData: PersonalTrainer[] = [
  {
    id: "pt-1",
    name: "Alex Carter",
    specialties: ["Powerlifting", "Strength Training"],
    description: "Alex is a certified powerlifting coach with over 10 years of experience. He focuses on building raw strength and perfecting form for major lifts.",
    image: "https://placehold.co/600x400.png",
    packages: {
      session: { price: 75 },
      monthly: { price: 250 },
    },
    availability: ["Mon, Wed, Fri: 4pm - 8pm", "Sat: 9am - 1pm"],
  },
  {
    id: "pt-2",
    name: "Jessica Lee",
    specialties: ["Yoga", "Flexibility", "Pilates"],
    description: "Jessica is a renowned yoga instructor who combines traditional practices with modern fitness. Her sessions improve flexibility, balance, and mental clarity.",
    image: "https://placehold.co/600x400.png",
    packages: {
      session: { price: 60 },
      monthly: { price: 200 },
    },
    availability: ["Tue, Thu: 8am - 12pm", "Sun: 10am - 2pm"],
  },
  {
    id: "pt-3",
    name: "Marcus Cole",
    specialties: ["Boxing", "HIIT", "Cardio"],
    description: "A former professional boxer, Marcus brings intensity and discipline to every session. Get ready to sweat with high-energy boxing drills and HIIT circuits.",
    image: "https://placehold.co/600x400.png",
    packages: {
      session: { price: 80 },
      monthly: { price: 280 },
    },
    availability: ["Mon, Wed: 6am - 10am", "Fri: 6pm - 9pm", "Sat: 12pm - 4pm"],
  },
];
