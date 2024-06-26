"use client"

import { motion } from "framer-motion"
import { ImCross } from "react-icons/im"
import Divider from "./Divider"
import { useEffect, useState } from "react"

export interface ModalProps {
  type: "text" | "description"
  limit: number
  header: "Name" | "Description"
  initialText: string
  CloseState: (state: boolean) => void
  onEdit: (type: string, text: string) => void
}

export default function Modal(props: ModalProps) {
  const [Edited, setEdited] = useState<boolean>(false)
  const [Text, setText] = useState<string>(props.initialText)

  function Close(event?: KeyboardEvent) {
    if (event) {
      if (event.key == "Escape") {
        return props.CloseState(false)
      }
      return
    }
    return props.CloseState(false)
  }

  useEffect(() => {
    const handler = document.addEventListener("keyup", Close)
    return () => {
      document.removeEventListener("keyup", Close, {})
    }
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 100 }}
      transition={{ duration: 0.5 }}
      className="flex absolute top-0 left-0 bg-black/30 w-screen h-screen z-10 justify-center items-center"
    >
      <section className="flex flex-col block bg-[var(--primary)] p-5 min-w-[40rem] rounded-2xl">
        <div className="flex w-full"><button className="w-auto h-auto mt-auto mb-auto mr-0 ml-auto" onClick={() => Close()}><ImCross /></button></div>
        <section className="space-y-2">
          <h1 className="text-4xl font-semibold">{props.header}</h1>
          <section className="w-[40%]">
            <Divider type="h" />
          </section>
          <textarea
            className="resize-none w-full max-[10rem] h-[7rem] bg-transparent outline-none"
            placeholder="Embrace your imagination"
            maxLength={props.limit}
            onChange={(event) => {
              const input_element = (event.target as HTMLTextAreaElement)
              setEdited(input_element.value != props.initialText)
              setText(input_element.value)
            }}
            value={Text}
          ></textarea>
          <button className="bg-[var(--secondary)] disabled:bg-gray-400 p-7 pt-2 pb-2 rounded-2xl" disabled={!Edited} onClick={(event) => {
            if (!Edited) return
            props.onEdit(props.type, Text)
            Close()
          }}>Edit</button>
        </section>
      </section>
    </motion.section>
  )
}
