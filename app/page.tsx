import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col justify-center p-28">
      <h1 className="text-8xl font-bold text-[var(--primary)]">Welcome</h1>
      <h1 className="text-7xl font-bold text-[var(--primary)]">Explore our <Link href="/tasks" className="hover:bg-gradient-to-r hover:from-[var(--secondary)] hover:to-[var(--accent)] hover:bg-clip-text hover:text-transparent transition-all duration-1000">App</Link></h1>
    </main>
  );
}
