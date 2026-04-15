type Props = React.ComponentProps<"select"> & {
  legend?: string;
  options: { value: string; label: string }[];
};

export function Select({ legend, options, className = "", ...rest }: Props) {
  return (
    <fieldset className="flex flex-col gap-1.5 border-none p-0 m-0">
      {legend && (
        <legend className="text-(--text-secondary) text-sm font-medium">
          {legend}
        </legend>
      )}

      <div className="relative">
        <select
          className={`
            w-full h-11 px-4 
            bg-(--bg-base) 
            text-(--text-primary) 
            rounded-md 
            border border-(--border) 
            outline-none
            appearance-none
            transition-all
            focus:border-(--accent)
            cursor-pointer
            ${className}
          `}
          {...rest}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-(--bg-card)"
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Ícone da Setinha Customizada */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--text-muted)">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 4.5L6 8L9.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </fieldset>
  );
}
