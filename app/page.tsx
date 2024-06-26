import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center items-center p-10 md:p-28">
      <h1 className="text-5xl md:text-7xl font-bold text-[var(--primary)]">Welcome</h1>
      <h1 className="text-4xl md:text-6xl font-bold text-[var(--primary)]">Explore our <Link href="/tasks" className="bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">App</Link></h1>
    </main>
  );
}
