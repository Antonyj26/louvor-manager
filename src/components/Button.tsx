type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type Props = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  isLoading?: boolean;
};

export function Button({
  variant = "primary",
  isLoading,
  children,
  className = "",
  ...rest
}: Props) {
  // Base de estilos que todos os botões compartilham
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 h-10 rounded-md font-medium transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Estilos específicos de cada variante
  const variants = {
    primary:
      "bg-(--accent) text-white hover:bg-(--accent-soft) shadow-lg shadow-(--accent-glow)",
    secondary:
      "bg-(--bg-card) text-(--text-primary) border border-(--border) hover:bg-(--bg-hover)",
    ghost:
      "bg-transparent text-(--text-secondary) hover:bg-(--bg-hover) hover:text-(--text-primary)",
    danger:
      "bg-(--red-bg) text-(--red) border border-(--red) hover:bg-(--red) hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || rest.disabled}
      {...rest}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
