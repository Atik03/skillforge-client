"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const result =
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
        });

      if (result.error) {
        toast.error(
          result.error.message ||
            "Invalid credentials"
        );
        return;
      }

      toast.success("Login successful");

      router.push("/");

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDemoLogin = () => {
    setValue(
      "email",
      "student@skillforge.com"
    );

    setValue(
      "password",
      "Student123"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">

      <div className="card w-full max-w-md bg-base-100 shadow-xl">

        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Welcome Back
          </h1>

          <p className="text-center opacity-70 mb-4">
            Login to your SkillForge account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
                        <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Email
              </legend>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-error text-sm">
                  {errors.email.message}
                </p>
              )}
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Password
              </legend>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="input input-bordered w-full pr-12"
                  placeholder="********"
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-error text-sm">
                  {errors.password.message}
                </p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Signing In..."
                : "Login"}
            </button>

            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline w-full"
            >
              Demo Login
            </button>

            <p className="text-center text-sm">

              Don't have an account?

              <Link
                href="/register"
                className="ml-2 text-primary font-semibold"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}
          

          