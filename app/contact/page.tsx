import Image from "next/image";
import { LiaDiscord } from "react-icons/lia";
import { RiGithubLine } from "react-icons/ri";
import { LiaLinkedinIn } from "react-icons/lia";

const Reference = ({ icon, url }: { icon: any, url: string }) => {
  return (
    <a href={url} target="_blank">
      <section className="bg-black/40 mt-auto mb-auto w-[6rem] h-[6rem] rounded-full">
        <section className="size-[6rem] bg-white rounded-full p-2">
          <section className="w-full h-full border-2 p-2 rounded-full border-black/40 hover:text-[var(--background)] transition-all duration-200">
            {icon}
          </section>
        </section>
      </section>
    </a>
  )
}

export default function Contact() {
  return (
    <main className="flex flex-col jusitfy-center items-center h-full">
      <section className="absolute top-1/2 -translate-y-1/2">
        <section className="size-[25rem] md:size-[35rem] bg-contain bg-center">
          <Image
            src="/contact.png"
            width={1000}
            height={1000}
            alt="My Goland With a notes in his hand"
          />
        </section>
        <section className="flex space-x-3 w-auto items-center justify-center">
          <Reference url={"https://github.com/DrunkTaric"} icon={<RiGithubLine className="m-auto w-full h-full" />} />
          <Reference url={"https://www.linkedin.com/in/comborush/"} icon={<LiaLinkedinIn className="m-auto w-full h-full" />} />
          <Reference url={"https://discord.com/users/921584553640992810"} icon={<LiaDiscord className="m-auto w-full h-full" />} />
        </section>
      </section>
    </main>
  )
}
