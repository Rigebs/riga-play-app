type PillProps = { children: React.ReactNode; className?: string };

export default function Pill({ children, className }: PillProps) {
  return (
    <span
      className={
        "inline-block px-3 py-1 rounded-full text-sm font-semibold bg-black/80 text-white " +
        (className ?? "")
      }
    >
      {children}
    </span>
  );
}
