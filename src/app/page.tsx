import { Bot } from 'lucide-react'
import Image from 'next/image'
import { AdvisorForm } from '@/components/forms/AdvisorForm'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const bannerImages = [
  {
    src: 'https://res.cloudinary.com/dsy1matb3/image/upload/v1759848717/unnamed_ccphwt.jpg',
    alt: 'Người đang tập tạ',
    hint: 'gym workout',
  },
  {
    src: 'https://res.cloudinary.com/dsy1matb3/image/upload/v1760270664/554495211_1139788997608328_8485153753941523005_n_ymiwvn.png',
    alt: 'Người đang tập tạ',
    hint: 'yoga class',
  },
  {
    src: 'https://res.cloudinary.com/dsy1matb3/image/upload/v1760270678/553796072_1393952202314576_1740880908129591934_n_duermu.png',
    alt: 'Người đang tập tạ',
    hint: 'cardio workout',
  },
]

export default function HomePage() {
  return (
    <div>
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {bannerImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.hint}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    <h2 className="text-4xl md:text-6xl font-bold font-headline">
                      Chương trình tập luyện của chúng tôi
                    </h2>
                    <p className="mt-4 text-lg md:text-xl">
                      Khám phá các lựa chọn đa dạng để đạt được mục tiêu thể chất của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
      </Carousel>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold font-headline text-primary">Tư vấn viên AI</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Nhận đề xuất thực phẩm bổ sung được cá nhân hóa dựa trên mục tiêu và lối sống riêng
              của bạn.
            </p>
          </div>
          <AdvisorForm />
        </div>
      </div>
    </div>
  )
}
