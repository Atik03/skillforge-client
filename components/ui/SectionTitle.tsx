interface SectionTitleProps {
  badge?: string;
  title: string;
  description?: string;
  center?: boolean;
}

export default function SectionTitle({
  badge,
  title,
  description,
  center = true,
}: SectionTitleProps) {
  return (
    <div className={`${center ? "text-center" : "text-left"} mb-12`}>
      {badge && (
        <div className="badge badge-primary badge-outline mb-4 px-4 py-3">
          {badge}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-4 max-w-2xl text-base md:text-lg text-base-content/70 mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}