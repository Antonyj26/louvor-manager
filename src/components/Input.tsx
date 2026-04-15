type Props = React.ComponentProps<"input"> & {
  legend?: string;
};

export function Input({ legend, type = "text", ...rest }: Props) {
  {
    return (
      <fieldset className="border-(--border-light)">
        {legend && (
          <legend className="text-(--text-secondary) text-sm font-medium">
            {legend}
          </legend>
        )}
        <input
          type={type}
          className="w-full h-11 px-4 
          bg-(--bg-base) 
          text-(--text-primary) 
          rounded-md
          border border-(--border-light) 
          outline-none
          transition-all
          placeholder:text-(--text-muted)
          focus:border-(--accent) 
          focus:ring-2 
          focus:ring-(--accent-glow)"
          {...rest}
        />
      </fieldset>
    );
  }
}
