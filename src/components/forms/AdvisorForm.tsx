"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getSupplementAdvice, type AdvisorState } from "@/actions/supplement-advisor";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang nhận lời khuyên...
        </>
      ) : (
        "Nhận lời khuyên của tôi"
      )}
    </Button>
  );
}

export function AdvisorForm() {
  const initialState: AdvisorState = {
    success: false,
    message: "",
    data: null,
    errors: null,
  };
  const [state, formAction] = useFormState(getSupplementAdvice, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Thành công!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.message && !state.success && state.errors === null) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fitnessGoals" className="text-lg font-semibold">Mục tiêu thể chất</Label>
            <Textarea
              id="fitnessGoals"
              name="fitnessGoals"
              placeholder="VD: Xây dựng cơ bắp săn chắc, giảm 5kg, cải thiện thời gian chạy marathon"
              rows={3}
            />
            {state.errors?.fitnessGoals && (
              <p className="text-sm font-medium text-destructive">{state.errors.fitnessGoals[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions" className="text-lg font-semibold">Chế độ ăn kiêng</Label>
            <Textarea
              id="dietaryRestrictions"
              name="dietaryRestrictions"
              placeholder="VD: Thuần chay, không gluten, không dung nạp lactose, không có"
              rows={3}
            />
             {state.errors?.dietaryRestrictions && (
              <p className="text-sm font-medium text-destructive">{state.errors.dietaryRestrictions[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="workoutRoutine" className="text-lg font-semibold">Thói quen tập luyện</Label>
            <Textarea
              id="workoutRoutine"
              name="workoutRoutine"
              placeholder="VD: Nâng tạ 4 lần một tuần, chạy bộ 3 lần một tuần, yoga"
              rows={4}
            />
            {state.errors?.workoutRoutine && (
              <p className="text-sm font-medium text-destructive">{state.errors.workoutRoutine[0]}</p>
            )}
          </div>
          <SubmitButton />
        </form>

        {state.success && state.data && (
          <Card className="mt-8 bg-secondary/50 border-accent shadow-inner">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-accent">
                <Sparkles className="w-6 h-6" />
                Đề xuất được cá nhân hóa của bạn
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-lg">Thực phẩm bổ sung được đề xuất:</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.data.suggestedSupplements}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">Lý do:</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{state.data.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
