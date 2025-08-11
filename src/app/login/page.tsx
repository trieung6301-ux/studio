import { LoginForm } from "@/components/forms/LoginForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-14rem)]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
