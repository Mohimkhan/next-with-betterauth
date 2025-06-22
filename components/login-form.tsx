"use client";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface formDataType {
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [formData, setFormData] = useState<formDataType>({});
  const router = useRouter();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    formData: formDataType
  ) => {
    e.preventDefault();
    console.log("submit: ");
    const { data, error } = await signIn.email({
      email: formData.email as string,
      password: formData.password as string,
      callbackURL: "/",
      fetchOptions: {
        onSuccess(ctx) {
          toast.success(`User successfully login ${ctx.data.user.name}`);
          router.push("/");
        },
        onError(ctx) {
          toast.error(`An unexpected error happen ${ctx.error.message}`);
        },
      },
    });
    console.log("properties", { data, error });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target?.name]: e.target?.value };
    });
  };

  console.log({ formData });

  return (
    <div
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (e) => {
              await handleSubmit(e, formData);
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="w-full"
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="underline underline-offset-4"
              >
                Sign Up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
