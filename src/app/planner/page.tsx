import { WorkoutPlanner } from "@/components/planner/WorkoutPlanner";
import { Dumbbell } from "lucide-react";

export default function PlannerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-primary text-primary-foreground rounded-full w-16 h-16 mb-4">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold font-headline text-primary">Công cụ lập kế hoạch tập luyện</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Lên kế hoạch cho lịch trình tập luyện hàng tuần của bạn với công cụ lập kế hoạch có thể tùy chỉnh của chúng tôi.
        </p>
      </div>
      <WorkoutPlanner />
    </div>
  );
}
