import { SignupForm } from "@/components/forms/SignupForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-14rem)]">
       <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Create an Account</CardTitle>
          <CardDescription>Join MuscleUp to track your progress and get personalized advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
           <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
