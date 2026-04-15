interface Props {
  title: string;
  icon?: string;
  children: React.ReactNode;
  description?: string;
}

export function FormSection({ title, icon, children, description }: Props) {
  return (
    <section className="bg-(--bg-surface) border border-(--border) rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        {icon && <span className="text-xl">{icon}</span>}
        <div>
          <h2 className="text-(--text-primary) font-semibold text-lg">
            {title}
          </h2>
          {description && (
            <p className="text-(--text-muted) text-xs mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
    </section>
  );
}
