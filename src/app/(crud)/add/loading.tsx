export default function Loading() {
  return (
    <div className="w-full">
      <div className="bg-zinc-300 w-64 rounded-md h-10 animate-pulse"></div>
      <div className="space-y-5 mt-5">
        <div className="w-full rounded-md h-10 bg-zinc-300 animate-pulse"></div>
        <div className="w-full rounded-md h-10 bg-zinc-300 animate-pulse"></div>
        <div className="w-full rounded-md h-24 bg-zinc-300 animate-pulse"></div>
      </div>
      <div className="h-10 w-12 bg-zinc-300 animate-pulse"></div>
    </div>
  );
}
