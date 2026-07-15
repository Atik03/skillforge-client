"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter your email");
      return;
    }

    toast.success(
      "Subscribed successfully!"
    );

    setEmail("");
  };

  return (
    <section className="py-20 bg-primary text-primary-content">

      <div className="max-w-3xl mx-auto px-4 text-center">

        <h2 className="text-4xl font-bold">
          Join Our Newsletter
        </h2>

        <p className="mt-3 opacity-90">
          Get updates about new courses,
          offers and learning resources.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-8 flex flex-col md:flex-row gap-4"
        >

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered text-black flex-1"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button className="btn btn-secondary">
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
}