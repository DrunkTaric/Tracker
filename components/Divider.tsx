export default function Divider({ type }: { type: "v" | "h" }) {
  if (type == "v") return <div className="w-2 h-full bg-black rounded-full"></div>
  return <div className="w-full h-2 bg-black rounded-full"></div>
}
