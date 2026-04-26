import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Building2 } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-success" />
          </div>
          <CardTitle className="text-2xl font-bold">Account Created!</CardTitle>
          <CardDescription>
            Your account has been created successfully. Please check your email to verify your account before signing in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              We&apos;ve sent a verification email to your inbox. Click the link in the email to activate your account.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/auth/login">
              Continue to Sign In
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}