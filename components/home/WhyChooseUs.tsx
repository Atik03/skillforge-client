import {
  Award,
  BookOpen,
  Clock3,
  Users,
} from "lucide-react";

const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from experienced professionals with real-world industry knowledge.",
    icon: Users,
  },
  {
    title: "High Quality Courses",
    description:
      "Well-structured courses designed to help you build practical skills.",
    icon: BookOpen,
  },
  {
    title: "Flexible Learning",
    description:
      "Study anytime and anywhere at your own pace without limitations.",
    icon: Clock3,
  },
  {
    title: "Certificate of Completion",
    description:
      "Receive certificates after successfully completing your learning journey.",
    icon: Award,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose SkillForge?
          </h2>

          <p className="mt-3 text-base-content/70 max-w-2xl mx-auto">
            Everything you need to learn modern skills and grow your career.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="card bg-base-100 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center text-center">

                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon
                      size={32}
                      className="text-primary"
                    />
                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    {item.title}
                  </h3>

                  <p className="text-base-content/70">
                    {item.description}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}