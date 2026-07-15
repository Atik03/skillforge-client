"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

import { User, Mail, ShieldCheck, CalendarDays, Save } from "lucide-react";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session } = authClient.useSession();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.email}`,
        );

        const result = await res.json();

        if (result.success) {
          setProfile(result.data);

          setName(result.data.name);

          setImage(result.data.image);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [session]);

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${profile?.email}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            image,
          }),
        },
      );

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setProfile((prev) =>
        prev
          ? {
              ...prev,
              name,
              image,
            }
          : prev,
      );

      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="skeleton h-[500px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold">Profile Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <h1 className="text-4xl font-bold">My Profile</h1>

          <p className="text-base-content/70">
            Update your account information.
          </p>

          <div className="divider" />

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left Side */}

            <div className="flex flex-col items-center bg-base-200 rounded-2xl p-8">
              <Image
                src={image || "/user.png"}
                alt={name}
                width={180}
                height={180}
                className="rounded-full object-cover border-4 border-primary"
                unoptimized
              />

              <h2 className="text-2xl font-bold mt-5">{name}</h2>

              <div className="badge badge-primary mt-2">{profile.role}</div>

              <div className="divider" />

              <div className="w-full space-y-5">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={18} />

                  <span className="break-all">{profile.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-primary" size={18} />

                  <span>{profile.role}</span>
                </div>

                <div className="flex items-center gap-3">
                  <CalendarDays className="text-primary" size={18} />

                  <span>
                    Joined {new Date(profile.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side */}

            <div className="lg:col-span-2">
              <div className="space-y-6">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Full Name</legend>

                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Profile Image URL</legend>

                  <input
                    type="url"
                    className="input input-bordered w-full"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/profile.jpg"
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Email Address</legend>

                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={profile.email}
                    disabled
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Account Role</legend>

                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={profile.role}
                    disabled
                  />
                </fieldset>

                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="btn btn-primary w-full"
                >
                  <Save size={18} />

                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
