"use client"
import Modal, { ModalProps } from "@/components/Modal";
import { useState } from "react";
import { PiNotepadBold } from "react-icons/pi";
import { useQuery } from "react-query";

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
    <main className="h-full flex p-32 pb-0">
    </main>
  )
}

export default function Tasks({ params }: { params: { id: number } }) {

  const [showModal, setShowModal] = useState<boolean>(false)
  const { isLoading, data, refetch } = useQuery(
    "Task",
    () => fetch(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}`).then((res) => res.json()), {
    refetchOnMount: true
  });
  const [dataModal, setDataModal] = useState<ModalProps>({
    limit: 0,
    type: "text",
    header: "Name",
    initialText: "",
    onEdit: async (type, text) => {
      const exportData: any = {}
      exportData[type] = text
      await fetch(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}&data=${JSON.stringify(exportData)}`, { method: "PUT" }).then((res) => res.json)
      refetch()
    },
    CloseState: setShowModal,
  })

  function openModal(type: "name" | "description") {
    if (type == "name") {
      setDataModal({ ...dataModal, type: "text", header: "Name", limit: 30, initialText: data.tasks.text })
    } else {
      setDataModal({ ...dataModal, type: "description", header: "Description", limit: 310, initialText: data.tasks.description })
    }
    setShowModal(true)
  }

  async function addNote(text: string) {
    let dataClone = data.tasks.notes
    dataClone.push(text)
    await fetch(`/api/tasks?session=${localStorage.getItem("session")}&id=${params.id}&data=${JSON.stringify({ notes: dataClone })}`, { method: "PUT" }).then((res) => res.json)
    refetch()
  }

  if (isLoading) return <TasksLoading />

  return (
    <main className="h-full w-full flex justify-center items-center pt-20">
      {
        showModal && <Modal {...dataModal} />
      }
      <section className="w-[90%] md:w-[70%] lg:w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex lg:ml-0 lg:mr-0 flex-col space-y-3">
          <button onClick={() => { openModal("name") }} className="h-auto">
            <h1 className="text-[var(--primary)] max-w-[70rem] text-4xl md:text-5xl lg:text-6xl text-left font-bold">{data.tasks.text}<span></span></h1>
          </button>
          <button onClick={() => { openModal("description") }}>
            {
              data && data.tasks.description.length <= 0
                ? <h1 className="text-2xl text-left">Click me to add a description</h1>
                : <h1 className="text-md md:text-xl max-w-[50rem] text-left">{data.tasks.description}</h1>
            }
          </button>
        </section>
        <section className="w-full h-[35rem] max-w-[40rem] h-full m-auto flex flex-col space-y-2 bg-[var(--primary)] rounded-2xl p-2">
          <ol className="border-2 border-gray-600 h-full space-y-2 rounded-2xl p-2 overflow-y-auto">
            {
              data && (data.tasks.notes as string[]).map((msg, index) => {
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
