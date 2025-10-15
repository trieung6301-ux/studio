'use client'

import { useState } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ptData, type PersonalTrainer } from '@/lib/placeholder-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface BookingPageProps {
  params: {
    slug: string
  }
}

// Mock data for weekly schedule
const weeklySchedule = {
  'pt-1': {
    monday: [
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: false },
      { time: '19:00', available: true },
    ],
    tuesday: [],
    wednesday: [
      { time: '16:00', available: true },
      { time: '17:00', available: false },
      { time: '18:00', available: true },
      { time: '19:00', available: true },
    ],
    thursday: [],
    friday: [
      { time: '16:00', available: true },
      { time: '17:00', available: true },
      { time: '18:00', available: true },
      { time: '19:00', available: false },
    ],
    saturday: [
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
      { time: '12:00', available: true },
    ],
    sunday: [],
  },
  'pt-2': {
    monday: [],
    tuesday: [
      { time: '08:00', available: true },
      { time: '09:00', available: true },
      { time: '10:00', available: true },
      { time: '11:00', available: false },
    ],
    wednesday: [],
    thursday: [
      { time: '08:00', available: true },
      { time: '09:00', available: false },
      { time: '10:00', available: true },
      { time: '11:00', available: true },
    ],
    friday: [],
    saturday: [],
    sunday: [
      { time: '10:00', available: true },
      { time: '11:00', available: true },
      { time: '12:00', available: false },
      { time: '13:00', available: true },
    ],
  },
  'pt-3': {
    monday: [
      { time: '06:00', available: true },
      { time: '07:00', available: true },
      { time: '08:00', available: false },
      { time: '09:00', available: true },
    ],
    tuesday: [],
    wednesday: [
      { time: '06:00', available: true },
      { time: '07:00', available: true },
      { time: '08:00', available: true },
      { time: '09:00', available: false },
    ],
    thursday: [],
    friday: [
      { time: '18:00', available: true },
      { time: '19:00', available: true },
      { time: '20:00', available: false },
    ],
    saturday: [
      { time: '12:00', available: true },
      { time: '13:00', available: true },
      { time: '14:00', available: true },
      { time: '15:00', available: false },
    ],
    sunday: [],
  },
}

const daysOfWeek = [
  { key: 'monday', label: 'Thứ 2', short: 'T2' },
  { key: 'tuesday', label: 'Thứ 3', short: 'T3' },
  { key: 'wednesday', label: 'Thứ 4', short: 'T4' },
  { key: 'thursday', label: 'Thứ 5', short: 'T5' },
  { key: 'friday', label: 'Thứ 6', short: 'T6' },
  { key: 'saturday', label: 'Thứ 7', short: 'T7' },
  { key: 'sunday', label: 'Chủ Nhật', short: 'CN' },
]

export default function BookingDetailPage({ params }: BookingPageProps) {
  const [selectedDay, setSelectedDay] = useState<string>('monday')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedPackage, setSelectedPackage] = useState<'session' | 'monthly'>('session')

  const pt = ptData.find((p) => p.id === params.slug)

  if (!pt) {
    notFound()
  }

  const schedule = weeklySchedule[pt.id as keyof typeof weeklySchedule] || {}
  const currentDaySchedule = schedule[selectedDay as keyof typeof schedule] || []

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBooking = () => {
    if (!selectedTime) {
      alert('Vui lòng chọn thời gian')
      return
    }

    // Create booking data for checkout
    const bookingData = {
      productName: `Đặt lịch ${pt.name}`,
      trainerName: pt.name,
      day: daysOfWeek.find((d) => d.key === selectedDay)?.label,
      time: selectedTime,
      package: selectedPackage === 'session' ? 'Buổi lẻ' : 'Gói tháng',
      price: selectedPackage === 'session' ? pt.packages.session.price : pt.packages.monthly.price,
      trainerId: pt.id,
      trainerImage: pt.image,
      trainerSpecialties: pt.specialties,
    }

    // Store booking data in localStorage for checkout
    localStorage.setItem('bookingData', JSON.stringify(bookingData))

    // Redirect to checkout
    window.location.href = '/checkout'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            ← Quay lại
          </Button>
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary mb-2">
          Đặt lịch với {pt.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          Chọn thời gian phù hợp và gói tập luyện của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* PT Information */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <div className="relative w-full h-64 mb-4">
                <Image
                  src={pt.image}
                  alt={pt.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top rounded-lg"
                />
              </div>
              <CardTitle className="text-2xl font-bold font-headline">{pt.name}</CardTitle>
              <div className="flex flex-wrap gap-2 mb-4">
                {pt.specialties.map((spec) => (
                  <Badge key={spec} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
              <CardDescription className="text-base">{pt.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="font-semibold">Lịch làm việc</h4>
                  <ul className="text-sm text-muted-foreground">
                    {pt.availability.map((slot) => (
                      <li key={slot}>{slot}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Gói tập luyện</h4>
                <div className="space-y-3">
                  <div
                    className={cn(
                      'p-3 border rounded-lg cursor-pointer transition-colors',
                      selectedPackage === 'session'
                        ? 'border-primary bg-primary/5'
                        : 'border-border',
                    )}
                    onClick={() => setSelectedPackage('session')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Buổi lẻ</h5>
                        <p className="text-sm text-muted-foreground">1 buổi tập</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(pt.packages.session.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'p-3 border rounded-lg cursor-pointer transition-colors',
                      selectedPackage === 'monthly'
                        ? 'border-primary bg-primary/5'
                        : 'border-border',
                    )}
                    onClick={() => setSelectedPackage('monthly')}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h5 className="font-medium">Gói tháng</h5>
                        <p className="text-sm text-muted-foreground">4 buổi/tháng</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(pt.packages.monthly.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Chọn thời gian
              </CardTitle>
              <CardDescription>Chọn ngày và giờ phù hợp với lịch của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Day Selection */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Chọn ngày trong tuần</h4>
                <div className="grid grid-cols-7 gap-2">
                  {daysOfWeek.map((day) => {
                    const hasSlots = schedule[day.key as keyof typeof schedule]?.length > 0
                    return (
                      <button
                        key={day.key}
                        onClick={() => setSelectedDay(day.key)}
                        disabled={!hasSlots}
                        className={cn(
                          'p-3 text-center rounded-lg border transition-colors',
                          selectedDay === day.key
                            ? 'border-primary bg-primary text-primary-foreground'
                            : hasSlots
                            ? 'border-border hover:border-primary hover:bg-primary/5'
                            : 'border-border bg-muted text-muted-foreground cursor-not-allowed',
                        )}
                      >
                        <div className="text-sm font-medium">{day.short}</div>
                        <div className="text-xs">
                          {hasSlots
                            ? `${schedule[day.key as keyof typeof schedule]?.length} slot`
                            : 'Nghỉ'}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {currentDaySchedule.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">
                    Chọn giờ - {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {currentDaySchedule.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={cn(
                          'p-3 text-center rounded-lg border transition-colors',
                          selectedTime === slot.time
                            ? 'border-primary bg-primary text-primary-foreground'
                            : slot.available
                            ? 'border-border hover:border-primary hover:bg-primary/5'
                            : 'border-border bg-muted text-muted-foreground cursor-not-allowed',
                        )}
                      >
                        <div className="font-medium">{slot.time}</div>
                        {!slot.available && (
                          <div className="text-xs text-muted-foreground">Đã đặt</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedTime && (
                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-3">Tóm tắt đặt lịch</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Huấn luyện viên:</span>
                      <span className="font-medium">{pt.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ngày:</span>
                      <span className="font-medium">
                        {daysOfWeek.find((d) => d.key === selectedDay)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Giờ:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gói:</span>
                      <span className="font-medium">
                        {selectedPackage === 'session' ? 'Buổi lẻ' : 'Gói tháng'}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Tổng cộng:</span>
                      <span className="text-primary">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(
                          selectedPackage === 'session'
                            ? pt.packages.session.price
                            : pt.packages.monthly.price,
                        )}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full mt-4" size="lg" onClick={handleBooking}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Xác nhận đặt lịch
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
