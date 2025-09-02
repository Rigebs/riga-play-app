type BigButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function BigButton({
  disabled,
  onClick,
  children,
  className,
}: BigButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "px-6 py-3 rounded-2xl font-bold shadow-lg border transition active:scale-95 " +
        (disabled
          ? "bg-zinc-700 text-zinc-400 border-zinc-700 cursor-not-allowed "
          : "bg-yellow-400 text-black border-yellow-300 hover:bg-yellow-300 ") +
        (className ? className : "")
      }
    >
      {children}
    </button>
  );
}
