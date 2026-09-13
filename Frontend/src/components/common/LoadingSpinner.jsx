export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-75">
      <div className="flex items-center gap-3">
        <div className="bg-[#78966a] h-3 w-3 animate-bounce rounded-full [animation-delay:-0.3s]" />
        <div className="bg-[#9fbe8d] h-3 w-3 animate-bounce rounded-full [animation-delay:-0.15s]" />
        <div className="bg-[#c9e9b5] h-3 w-3 animate-bounce rounded-full" />
      </div>
    </div>
  );
}
