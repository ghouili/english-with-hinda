import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LogIn, Mail, Lock } from "lucide-react";

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <SEOHead
        title="Login — English With Hinda"
        description="Sign in to your English With Hinda account to access your learning resources."
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-background via-muted/40 to-background min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-primary/10" />
          <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/10" />
          <div className="absolute top-1/2 left-1/3 h-40 w-40 rounded-full bg-primary/5" />
        </div>

        <div className="container relative py-12 md:py-16">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/95 p-6 md:p-8 shadow-xl">
            <div className="text-center">
              <p className="text-sm tracking-wide uppercase font-semibold text-primary">
                Welcome back
              </p>
              <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-foreground">
                Login
              </h1>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Sign in to continue your learning journey.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="mt-1.5 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1.5 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-9"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="remember" className="flex items-center gap-2 text-sm font-normal cursor-pointer text-muted-foreground">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  Remember me
                </Label>
                <Link to="/contact" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full font-semibold">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/contact" className="text-primary font-medium hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
