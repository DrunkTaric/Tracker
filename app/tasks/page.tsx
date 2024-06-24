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

export default function Tasks() {

  const [CurrentTasks, setCurrentTasks] = useState<TaskT[]>([])

  function AddTask(newTask: TaskT) {
    setCurrentTasks([newTask, ...CurrentTasks])
  }

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <section className="w-[40rem] h-[40rem] space-y-2">
        <div className="flex bg-[var(--primary)] w-full p-2 rounded-2xl">
          <input maxLength={75} className="w-full h-8 border-2 border-gray-600 outline-none p-5 rounded-2xl m-auto bg-transparent" placeholder="Type here" onKeyUp={(event) => {
            event.preventDefault()
            if (event.key != "Enter") { return }
            const input_element = (event.target as HTMLInputElement)
            if (input_element.value.length <= 0) { return }
            AddTask({ id: null, text: input_element.value, description: "", notes: [] } satisfies TaskT)
          }} />
        </div>
        <ol className="h-full">
          {
            CurrentTasks.map((item) => {
              return <Task text={item.text} />
            })
          }
        </ol>
      </section>
    </main>
  )
}
