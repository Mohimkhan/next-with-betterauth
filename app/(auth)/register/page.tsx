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
import { signUp } from "@/lib/auth-client";
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
    const { data, error } = await signUp.email({
      email: formData.email as string,
      password: formData.password as string,
      name: "mohim khan",
      phone: formData.phone as string,
      address: formData.address as string,
      role: formData.role as string,
      callbackURL: "/",
      fetchOptions: {
        onSuccess(ctx) {
          toast.success(`User successfully register ${ctx.data.user.name}`);
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
    <div className="absolute inset-0 flex justify-center flex-col items-center">
      <div
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Enter your email below to register to your account
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
                <div className="grid gap-2">
                  <Label htmlFor="email">Phone</Label>
                  <Input
                    id="email"
                    type="tel"
                    name="phone"
                    placeholder="+8801712476690"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Address</Label>
                  <Input
                    id="email"
                    type="text"
                    name="address"
                    placeholder="a bc 05, road"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Role</Label>
                  <Input
                    id="email"
                    type="text"
                    name="role"
                    placeholder="member | admin"
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="flex items-center">
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
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
                Already have an account?{" "}
                <a
                  href="/login"
                  className="underline underline-offset-4"
                >
                  Sign In
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
