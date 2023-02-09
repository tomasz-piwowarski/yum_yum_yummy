export default function Error({
  condition,
  text,
}: {
  condition: boolean;
  text: string | undefined;
}) {
  return (
    <>{condition && <span className="font-medium text-red-600">{text}</span>}</>
  );
}
