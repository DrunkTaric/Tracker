"use client"

import Link from "next/link"
import { Task as TaskT } from "@prisma/client";

import { IoIosRemoveCircleOutline } from "react-icons/io";

import { Authenticate, isAuthenticated } from "@/functions/auth";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";

type TaskExportedType = TaskT & { isLoading?: boolean }

const TaskLoading = () => {
  return (
    <li className="flex space-x-3 bg-[var(--primary)] border-4 border-gray-600 rounded-xl w-full p-2 rounded-2xl text-gray-500 hover:text-gray-700">
      <div className="flex w-[90%]">
        <div className="mt-auto mb-auto h-[60%] w-[50%] animate-pulse bg-gray-600 bg-opacity-50 rounded-xl"></div>
      </div>
      <button><IoIosRemoveCircleOutline className="text-2xl text-red-500 m-auto" /></button>
    </li>
  )
}

const Task = ({ item, refetch }: { item: TaskExportedType, refetch: () => void }) => {

  async function DeleteTask() {
    await fetch(`/api/tasks?session=${localStorage.getItem("session")}&id=${item?.id}`, { method: "DELETE" })
    refetch()
  }

  return (
    <li className="flex space-x-3 bg-[var(--primary)] border-4 border-gray-600 rounded-xl w-full p-2 rounded-2xl text-gray-500 hover:text-gray-700">
      <Link className="w-[90%] items-center justify-center" href={`/tasks/${item?.id}`}>
        <h1>{item?.text}</h1>
      </Link>
      <button onClick={DeleteTask}><IoIosRemoveCircleOutline className="text-2xl text-red-500 m-auto" /></button>
    </li>
  )
}

export default function Tasks() {

  const [currentTasks, setCurrentTasks] = useState<TaskExportedType[]>([])

  const { isError, isLoading, data, mutate } = useMutation({
    mutationFn: async () => {
      return await fetch(`/api/tasks?session=${localStorage.getItem("session")}`).then((res) => res.json())
    },
    onSuccess(data, variables, context) {
      setCurrentTasks(data.tasks.reverse())
    },
  })

  useEffect(() => {
    mutate()
  }, [mutate])


  async function AddTask(text: string) {
    if (!isAuthenticated()) { await Authenticate() }
    setCurrentTasks([{
      id: 0,
      notes: [],
      text: text,
      description: "",
      isLoading: true,
      updatedAt: new Date(),
      createdAt: new Date(),
      sessionId: localStorage.getItem("session") ?? "",
    }, ...currentTasks])
    await fetch(`/api/tasks?session=${localStorage.getItem("session")}&text=${text}`, { method: "POST" })
    mutate()
  }

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <section className="w-[40rem] h-[40rem] space-y-3">
        <div className="flex bg-[var(--primary)] w-full p-2 rounded-2xl">
          <input maxLength={75} className="w-full h-8 border-2 border-gray-600 outline-none p-5 rounded-2xl m-auto bg-transparent" placeholder="Type here" onKeyUp={(event) => {
            event.preventDefault()
            if (event.key != "Enter") { return }
            const input_element = (event.target as HTMLInputElement)
            if (input_element.value.length <= 0) { return }
            AddTask(input_element.value)
            input_element.value = ""
          }} />
        </div>
        <ol className="appearance-none h-full space-y-1 overflow-y-auto">
          {
            !isLoading ? currentTasks.map((item: TaskT, index: number) => {
              return <Task key={index} item={item} refetch={mutate} />
            })
              : [1, 2, 3, 4, 5].map((index) => {
                return <TaskLoading key={index} />
              })
          }
        </ol>
      </section>
    </main>
  )
}
