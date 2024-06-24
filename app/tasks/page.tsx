"use client"

import Link from "next/link"
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const Task = ({ text }: { text: string }) => {
  return (
    <li className="bg-[var(--primary)] border-4 border-gray-600 rounded-xl w-full p-2 rounded-2xl text-gray-500 hover:text-gray-700">
      <Link className="flex space-x-2 items-center justify-center" href="">
        <h1 className="w-[90%]">{text}</h1>
        <section className="flex h-full">
          <button><IoIosRemoveCircleOutline className="text-2xl text-red-500 mt-auto" /></button>
          <button><IoIosLink className="text-2xl text-green-500 mb-auto" /></button>
        </section>
      </Link>
    </li>
  )
}

interface TaskT {
  id: number | null,
  text: string,
  description: string,
  notes: string[]
}

