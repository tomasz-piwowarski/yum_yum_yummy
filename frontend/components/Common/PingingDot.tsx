export default function PingingDot() {
  return (
    <span className="absolute right-0 top-0 h-2 w-2">
      <span className="absolute right-0 top-0 inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
      <span className="absolute right-0 top-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
    </span>
  );
}
