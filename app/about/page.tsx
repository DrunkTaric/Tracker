"use client"

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col h-full justify-center items-center">
      <section className="flex flex-col space-y-10">
        <section className="size-[25rem] ml-auto mr-auto bg-contain bg-center">
          <Image
            src="/note.png"
            width={1000}
            height={1000}
            alt="My Goland With a notes in his hand"
          />
        </section>
        <motion.h1 className="text-center text-6xl text-[var(--primary)]">Tracker App</motion.h1>
        <h1 className="text-xl md:text-2xl text-center lg:text-3xl w-auto text-[var(--primary)]">Tracker is an application made to organize tasks, and make it fun and easy to use.</h1>
      </section>
    </main>
  )
}
