"use client"
import { FaPen } from "react-icons/fa";
import { useEffect, useState } from "react";
import { PiNotepadBold } from "react-icons/pi";
import { Task as TaskT } from "@prisma/client";
import { isAuthenticated } from "@/functions/auth";

const Note = ({ text }: { text: string }) => {
  return (
    <li>
      <h1 className="flex"><PiNotepadBold className="text-[var(--secondary)] text-3xl" />{text}</h1>
    </li>
  )
}

export default function Tasks({ params }: { params: { id: number } }) {

  const [Task, setTask] = useState<TaskT | undefined>();

  async function fetchData() {
    if (isAuthenticated()) {
      fetch(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}`).then(async (res) => {
        const data = await res.json();
        setTask(data.tasks);
      })
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <main className="h-full flex p-32 pb-0">
      <section>
        <h1 className="text-[var(--primary)] text-5xl font-bold">{Task ? Task.text : "My New Task"}<span></span></h1>
        {
          Task && Task.description.length <= 0 ?
            <button className="flex w-[20rem] mt-5 text-left space-x-2"><FaPen className="mt-auto mb-auto" /><h1>Add discription ...</h1></button>
            : <h1>{Task?.description}<button><FaPen className="mt-auto mb-auto" /></button></h1>
        }
      </section>
      <section className="mr-0 ml-auto bg-[var(--primary)] w-[35rem] h-[90%] rounded-2xl p-2">
        <ol className="border-2 border-gray-600 h-full rounded-2xl p-2">
          {
            Task && (Task.notes as string[]).map((msg, index) => {
              return <Note text={msg} key={index} />
            })
          }
        </ol>
      </section>
    </main>
  )
}
