import Image from "next/image";

export default function About() {
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Not Found</h1>
      <Image
        src="/cute.png"
        alt="Cute golang image"
        width={500} height={500}
      />
      <h1>the page you trying to reach doesn&apost exist</h1>
    </main>
  )
}
