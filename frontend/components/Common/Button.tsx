interface ButtonInterface {
  children: string | JSX.Element;
  additionalClasses?: string;
  onClick?: () => void;
  type: "button" | "submit" | "reset" | undefined;
}

export default function Button({
  children,
  additionalClasses,
  onClick,
  type,
}: ButtonInterface) {
  return (
    <button
      className={`rounded-lg bg-gray-800 px-2.5 py-1 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 ${additionalClasses}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
