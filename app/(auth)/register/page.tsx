"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { saveUser } from "@/services/userService";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    image: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[a-z]/, "Must contain one lowercase letter")
      .regex(/[0-9]/, "Must contain one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
    const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

 const onSubmit = async (data: RegisterFormData) => {
  try {
    console.log(authClient);

    const result = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image || "",
    });

    // Better Auth error
    if (result.error) {
      toast.error(result.error.message || "Registration failed");
      return;
    }

    // Save application user
    await saveUser({
      name: data.name,
      email: data.email,
      image: data.image || "",
    });

    toast.success("Registration successful 🎉");

    router.push("/");
    router.refresh();
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center">
            Create Your Account
          </h1>

          <p className="text-center text-base-content/70 mb-6">
            Join SkillForge and start learning today.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Name */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Full Name
              </legend>

              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter your full name"
                {...register("name")}
              />

              {errors.name && (
                <p className="text-error text-sm">
                  {errors.name.message}
                </p>
              )}
            </fieldset>

            {/* Photo URL */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Photo URL (Optional)
              </legend>

              <input
                type="url"
                className="input input-bordered w-full"
                placeholder="https://..."
                {...register("image")}
              />

              {errors.image && (
                <p className="text-error text-sm">
                  {errors.image.message}
                </p>
              )}
            </fieldset>

            {/* Email */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Email
              </legend>

              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="example@gmail.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-error text-sm">
                  {errors.email.message}
                </p>
              )}
            </fieldset>

            {/* Password */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Password
              </legend>

              <div className="relative">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  className="input input-bordered w-full pr-12"
                  placeholder="********"
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setShowPassword(!showPassword)
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

            {/* Confirm Password */}

            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Confirm Password
              </legend>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  className="input input-bordered w-full pr-12"
                  placeholder="********"
                  {...register("confirmPassword")}
                />

                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-error text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </fieldset>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-semibold"

              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}