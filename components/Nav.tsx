import Link from "next/link"

const NavButton = ({ name, route }: { name: string, route: string }) => {
  return (
    <Link href={route} className="font-bold">
      {name}
    </Link>
  )
}

export default function Nav() {
  return (
    <nav className="fixed flex h-16 bg-[var(--primary)] pl-10 pr-10 rounded-b-3xl left-1/2 -translate-x-1/2 space-x-12 justify-center items-center">
      <NavButton name="Home" route="/" />
      <NavButton name="Tasks" route="/tasks" />
      <NavButton name="About" route="/about" />
      <NavButton name="Contact" route="/contact" />
    </nav>
  )
}
