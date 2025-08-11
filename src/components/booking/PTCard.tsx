import Image from "next/image";
import type { PersonalTrainer } from "@/lib/placeholder-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Clock, Tag, DollarSign, CalendarDays, Sparkles } from "lucide-react";

interface PTCardProps {
  pt: PersonalTrainer;
}

export function PTCard({ pt }: PTCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative w-full h-64">
          <Image
            src={pt.image}
            alt={pt.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint="personal trainer fitness"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold font-headline mb-2">{pt.name}</CardTitle>
        <div className="flex flex-wrap gap-2 mb-4">
            {pt.specialties.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-sm">{spec}</Badge>
            ))}
        </div>
        <CardDescription className="text-base text-muted-foreground mb-4">{pt.description}</CardDescription>
        
        <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-primary" />
                <div>
                    <h4 className="font-semibold">Lịch làm việc</h4>
                    <ul className="list-none text-muted-foreground">
                        {pt.availability.map((slot) => <li key={slot}>{slot}</li>)}
                    </ul>
                </div>
            </div>
             <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                 <div>
                    <h4 className="font-semibold">Các gói</h4>
                    <div className="text-muted-foreground">
                        <p>Buổi lẻ: ${pt.packages.session.price}</p>
                        <p>Tháng: ${pt.packages.monthly.price}</p>
                    </div>
                 </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full">Đặt ngay</Button>
      </CardFooter>
    </Card>
  );
}
