export interface Product {
  id: string
  name: string
  category: 'Protein' | 'Pre-Workout' | 'Vitamin' | 'Creatine' | 'Dụng cụ'
  brand: 'Optimum Nutrition' | 'MyProtein' | 'GymShark' | 'Bulk' | 'Generic'
  price: number
  rating: number
  reviews: number
  image: string
  description: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Gold Standard Whey',
    category: 'Protein',
    brand: 'Optimum Nutrition',
    price: 1500000,
    rating: 5,
    reviews: 1250,
    image: 'https://placehold.co/600x400.png',
    description: 'Bột whey protein bán chạy nhất thế giới.',
  },
  {
    id: '2',
    name: 'C4 Original Pre-Workout',
    category: 'Pre-Workout',
    brand: 'GymShark',
    price: 750000,
    rating: 4,
    reviews: 890,
    image: 'https://placehold.co/600x400.png',
    description:
      'Năng lượng bùng nổ, sự tập trung cao độ và một sự thôi thúc không thể cưỡng lại để vượt qua mọi thử thách.',
  },
  {
    id: '3',
    name: 'Opti-Men Multivitamin',
    category: 'Vitamin',
    brand: 'Optimum Nutrition',
    price: 625000,
    rating: 5,
    reviews: 740,
    image: 'https://placehold.co/600x400.png',
    description: 'Multivitamin hiệu lực cao cho nam giới năng động.',
  },
  {
    id: '4',
    name: 'Creatine Monohydrate',
    category: 'Creatine',
    brand: 'MyProtein',
    price: 500000,
    rating: 4,
    reviews: 1500,
    image: 'https://placehold.co/600x400.png',
    description: 'Creatine monohydrate tinh khiết để tăng hiệu suất thể chất.',
  },
  {
    id: '5',
    name: 'Impact Whey Isolate',
    category: 'Protein',
    brand: 'MyProtein',
    price: 1250000,
    rating: 5,
    reviews: 980,
    image: 'https://placehold.co/600x400.png',
    description: 'Isolate siêu tinh khiết, với hàm lượng protein trên 90%.',
  },
  {
    id: '6',
    name: 'The Pre-Workout',
    category: 'Pre-Workout',
    brand: 'MyProtein',
    price: 875000,
    rating: 4,
    reviews: 650,
    image: 'https://placehold.co/600x400.png',
    description:
      'Một sự pha trộn mạnh mẽ của các thành phần để cung cấp năng lượng cho buổi tập của bạn.',
  },
  {
    id: '7',
    name: 'Creatine Monohydrate Powder',
    category: 'Creatine',
    brand: 'Bulk',
    price: 575000,
    rating: 5,
    reviews: 1100,
    image: 'https://placehold.co/600x400.png',
    description:
      'Bột creatine micronized để cải thiện sự hấp thụ và hiệu suất.',
  },
  {
    id: '8',
    name: 'Legacy Pre-Workout',
    category: 'Pre-Workout',
    brand: 'GymShark',
    price: 1000000,
    rating: 5,
    reviews: 450,
    image: 'https://placehold.co/600x400.png',
    description:
      'Pre-workout tối thượng cho năng lượng, sự tập trung và sự bơm cơ.',
  },
  {
    id: '9',
    name: 'Pure Whey Protein',
    category: 'Protein',
    brand: 'Bulk',
    price: 1150000,
    rating: 4,
    reviews: 880,
    image: 'https://placehold.co/600x400.png',
    description: 'Whey protein concentrate chất lượng cao từ bò ăn cỏ.',
  },
  {
    id: '10',
    name: 'Dây kéo tập lưng (Lifting Straps)',
    category: 'Dụng cụ',
    brand: 'Generic',
    price: 375000,
    rating: 4,
    reviews: 350,
    image: 'https://placehold.co/600x400.png',
    description: 'Dây kéo chịu lực giúp cải thiện độ bám và hiệu quả nâng tạ.',
  },
  {
    id: '11',
    name: 'Con lăn xốp (Foam Roller)',
    category: 'Dụng cụ',
    brand: 'Generic',
    price: 650000,
    rating: 5,
    reviews: 550,
    image: 'https://placehold.co/600x400.png',
    description:
      'Con lăn xốp mật độ cao giúp phục hồi cơ bắp và giảm đau nhức.',
  },
  {
    id: '12',
    name: 'Bình lắc Protein',
    category: 'Dụng cụ',
    brand: 'GymShark',
    price: 250000,
    rating: 4,
    reviews: 1200,
    image: 'https://placehold.co/600x400.png',
    description:
      'Bình lắc không chứa BPA, chống rò rỉ để pha trộn protein một cách dễ dàng.',
  },
]

export const categories = [...new Set(products.map((p) => p.category))]
export const brands = [...new Set(products.map((p) => p.brand))]

export interface MembershipPlan {
  id: string
  title: string
  description?: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  isPopular: boolean
  discount?: string
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: 'plan-basic-monthly',
    title: 'Cơ bản',
    description: 'Lựa chọn tuyệt vời để bắt đầu.',
    price: 800000,
    period: 'monthly',
    features: [
      'Toàn quyền truy cập phòng tập',
      'Truy cập tất cả các lớp học nhóm',
      'Sử dụng phòng thay đồ',
      'Không cam kết, hủy bất kỳ lúc nào',
    ],
    isPopular: false,
  },
  {
    id: 'plan-pro-monthly',
    title: 'Chuyên nghiệp',
    description: 'Dành cho những người tập luyện nghiêm túc.',
    price: 1200000,
    period: 'monthly',
    features: [
      'Tất cả các lợi ích của gói Cơ bản',
      '2 buổi tập với HLV cá nhân miễn phí',
      'Miễn phí một món đồ lưu niệm',
      '2 thẻ khách mỗi tháng',
    ],
    isPopular: true,
  },
  {
    id: 'plan-vip-monthly',
    title: 'VIP',
    description: 'Trải nghiệm đỉnh cao.',
    price: 2000000,
    period: 'monthly',
    features: [
      'Tất cả các lợi ích của gói Chuyên nghiệp',
      'Thẻ khách không giới hạn',
      'Giảm 20% tất cả các loại thực phẩm bổ sung',
      'Kế hoạch tập luyện được cá nhân hóa',
    ],
    isPopular: false,
  },
  {
    id: 'plan-basic-yearly',
    title: 'Cơ bản',
    price: 7680000, // 800k * 12 * 0.8
    period: 'yearly',
    features: [
      'Toàn quyền truy cập phòng tập',
      'Truy cập tất cả các lớp học nhóm',
      'Sử dụng phòng thay đồ',
      'Không cam kết, hủy bất kỳ lúc nào',
    ],
    isPopular: false,
  },
  {
    id: 'plan-pro-yearly',
    title: 'Chuyên nghiệp',
    price: 11520000, // 1.2M * 12 * 0.8
    period: 'yearly',
    features: [
      'Tất cả các lợi ích của gói Cơ bản',
      '2 buổi tập với HLV cá nhân miễn phí',
      'Miễn phí một món đồ lưu niệm',
      '2 thẻ khách mỗi tháng',
    ],
    isPopular: true,
  },
  {
    id: 'plan-vip-yearly',
    title: 'VIP',
    price: 19200000, // 2M * 12 * 0.8
    period: 'yearly',
    features: [
      'Tất cả các lợi ích của gói Chuyên nghiệp',
      'Thẻ khách không giới hạn',
      'Giảm 20% tất cả các loại thực phẩm bổ sung',
      'Kế hoạch tập luyện được cá nhân hóa',
    ],
    isPopular: false,
  },
]

export interface Exercise {
  id: string
  name: string
  sets: string
  reps: string
  weight: string
}

export const weeklyWorkoutPlan: Record<string, Exercise[]> = {
  monday: [
    { id: '1', name: 'Đẩy ngực', sets: '4', reps: '8-12', weight: '80'},
    { id: '2', name: 'Squat', sets: '4', reps: '8-12', weight: '100' },
    { id: '3', name: 'Deadlift', sets: '3', reps: '5-8', weight: '120' },
  ],
  tuesday: [],
  wednesday: [
    { id: '4', name: 'Đẩy vai', sets: '4', reps: '8-12', weight: '50' },
    { id: '5', name: 'Kéo xà', sets: '4', reps: '8-12', weight: '70' },
    {
      id: '6',
      name: 'Hít xà',
      sets: '3',
      reps: 'Đến khi thất bại',
      weight: 'Trọng lượng cơ thể',
    },
  ],
  thursday: [],
  friday: [
    {
      id: '7',
      name: 'Đẩy ngực dốc lên với tạ đơn',
      sets: '4',
      reps: '10-15',
      weight: '30',
    },
    { id: '8', name: 'Đạp chân', sets: '4', reps: '10-15', weight: '150' },
    { id: '9', name: 'Cuốn tay trước', sets: '3', reps: '10-15', weight: '15' },
  ],
  saturday: [],
  sunday: [],
}

export interface PersonalTrainer {
  id: string
  name: string
  specialties: string[]
  description: string
  image: string
  packages: {
    session: {
      price: number
    }
    monthly: {
      price: number
    }
  }
  availability: string[]
}

export const ptData: PersonalTrainer[] = [
  {
    id: 'pt-1',
    name: 'Alex Carter',
    specialties: ['Powerlifting', 'Tập luyện sức mạnh'],
    description:
      'Alex là một huấn luyện viên powerlifting được chứng nhận với hơn 10 năm kinh nghiệm. Anh ấy tập trung vào việc xây dựng sức mạnh thô và hoàn thiện kỹ thuật cho các bài tập chính.',
    image: 'https://placehold.co/600x400.png',
    packages: {
      session: { price: 1875000 },
      monthly: { price: 6250000 },
    },
    availability: ['Thứ 2, 4, 6: 4pm - 8pm', 'Thứ 7: 9am - 1pm'],
  },
  {
    id: 'pt-2',
    name: 'Jessica Lee',
    specialties: ['Yoga', 'Linh hoạt', 'Pilates'],
    description:
      'Jessica là một giảng viên yoga nổi tiếng, kết hợp các phương pháp truyền thống với thể dục hiện đại. Các buổi tập của cô giúp cải thiện sự linh hoạt, cân bằng và tinh thần minh mẫn.',
    image: 'https://placehold.co/600x400.png',
    packages: {
      session: { price: 1500000 },
      monthly: { price: 5000000 },
    },
    availability: ['Thứ 3, 5: 8am - 12pm', 'Chủ Nhật: 10am - 2pm'],
  },
  {
    id: 'pt-3',
    name: 'Marcus Cole',
    specialties: ['Quyền Anh', 'HIIT', 'Cardio'],
    description:
      'Từng là một võ sĩ quyền Anh chuyên nghiệp, Marcus mang đến sự quyết liệt và kỷ luật cho mỗi buổi tập. Hãy sẵn sàng đổ mồ hôi với các bài tập quyền Anh năng lượng cao và các vòng lặp HIIT.',
    image: 'https://placehold.co/600x400.png',
    packages: {
      session: { price: 2000000 },
      monthly: { price: 7000000 },
    },
    availability: [
      'Thứ 2, 4: 6am - 10am',
      'Thứ 6: 6pm - 9pm',
      'Thứ 7: 12pm - 4pm',
    ],
  },
]
