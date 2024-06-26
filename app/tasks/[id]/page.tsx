"use client"
import Modal, { ModalProps } from "@/components/Modal";
import { PiNotepadBold } from "react-icons/pi";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";
import { Task } from "@prisma/client";

const Note = ({ text }: { text: string }) => {
  return (
    <li className="flex">
      <PiNotepadBold className="text-[var(--secondary)] text-3xl" />
      <h1 className="flex mt-auto mb-auto">{text}</h1>
    </li>
  )
}

const TasksLoading = () => {
  return (
    <main className="h-full w-full flex lg:justify-center lg:items-center pt-32 lg:pt-20">
      <section className="ml-auto mr-auto w-[90%] md:w-[70%] lg:w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="space-y-5">
          <div className="animate-pulse bg-gray-200 p-5 w-[35%] h-min rounded-2xl"></div>
          <section className="space-y-3">
            <div className="animate-pulse bg-gray-300 p-2 w-[90%] h-min rounded-2xl"></div>
            <div className="animate-pulse bg-gray-300 p-2 w-[85%] h-min rounded-2xl"></div>
            <div className="animate-pulse bg-gray-300 p-2 w-[80%] h-min rounded-2xl"></div>
            <div className="animate-pulse bg-gray-300 p-2 w-[70%] h-min rounded-2xl"></div>
            <div className="animate-pulse bg-gray-300 p-2 w-[30%] h-min rounded-2xl"></div>
          </section>
        </section>
        <section className="w-full max-w-[40rem] h-full m-auto flex flex-col space-y-2 bg-[var(--primary)] rounded-2xl p-2">
          <div className="h-[35rem] border-2 border-gray-600 space-y-2 rounded-2xl p-2 overflow-y-auto">
          </div>
          <input
            maxLength={35}
            placeholder="Add a Note"
            className="flex w-[90%] ml-auto mr-auto p-5 pb-2 pt-2 bg-transparent rounded-2xl border-2 border-gray-600 outline-none"
          />
        </section>
      </section>
    </main>
  )
}

export default function Tasks({ params }: { params: { id: number } }) {

  const [currentTask, setTask] = useState<Task | undefined>()
  const { isLoading, refetch } = useQuery(
    "Task",
    () => axios.get(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}`).then((res) => res.data), {
    onSuccess(data) {
      setTask(data.tasks)
    },
    refetchOnMount: true
  });
  const [showModal, setShowModal] = useState<boolean>(false)
  const [dataModal, setDataModal] = useState<ModalProps>({
    limit: 0,
    type: "text",
    header: "Name",
    initialText: "",
    onEdit: async (type, text) => {
      const exportData: any = {}
      exportData[type] = text
      await axios.put(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}&data=${JSON.stringify(exportData)}`)
      refetch()
    },
    CloseState: setShowModal,
  })

  function openModal(type: "name" | "description") {
    if (type == "name") {
      setDataModal({ ...dataModal, type: "text", header: "Name", limit: 30, initialText: currentTask?.text ?? "" })
    } else {
      setDataModal({ ...dataModal, type: "description", header: "Description", limit: 310, initialText: currentTask?.description ?? "" })
    }
    setShowModal(true)
  }

  async function addNote(text: string) {
    let dataClone = currentTask?.notes as string[]
    dataClone.push(text)
    await axios.put(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}&data=${JSON.stringify({ notes: dataClone })}`)
    refetch()
  }

  if (isLoading || !currentTask) return <TasksLoading />

  return (
    <main className="h-full w-full flex lg:justify-center lg:items-center pt-32 lg:pt-20">
      {
        showModal && <Modal {...dataModal} />
      }
      <section className="ml-auto mr-auto w-[90%] md:w-[70%] lg:w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex lg:ml-0 lg:mr-0 flex-col space-y-3">
          <button onClick={() => { openModal("name") }} className="h-auto">
            <h1 className="text-[var(--primary)] max-w-[70rem] text-4xl md:text-5xl lg:text-6xl text-left font-bold">{currentTask?.text}<span></span></h1>
          </button>
          <button onClick={() => { openModal("description") }}>
            {
              currentTask && currentTask.description.length <= 0
                ? <h1 className="text-2xl text-left">Click me to add a description</h1>
                : <h1 className="text-md md:text-xl max-w-[45rem] text-left">{currentTask?.description}</h1>
            }
          </button>
        </section>
        <section className="w-full max-w-[40rem] h-full m-auto flex flex-col space-y-2 bg-[var(--primary)] rounded-2xl p-2">
          <ol className="h-[35rem] border-2 border-gray-600 space-y-2 rounded-2xl p-2 overflow-y-auto">
            {
              currentTask && (currentTask.notes as string[]).map((msg, index) => {
                return <Note text={msg} key={index} />
              })
            }
          </ol>
          <input
            maxLength={35}
            placeholder="Add a Note"
            className="flex w-[90%] ml-auto mr-auto p-5 pb-2 pt-2 bg-transparent rounded-2xl border-2 border-gray-600 outline-none"
            onKeyUp={(event) => {
              event.preventDefault()
              if (event.key != "Enter") { return }
              const input_element = (event.target as HTMLInputElement)
              if (input_element.value.length <= 0) { return }
              addNote(input_element.value)
              input_element.value = ""
            }}
          />
        </section>
      </section>
    </main>
  )
}
