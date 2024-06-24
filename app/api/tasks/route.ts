import { extractParams } from '@/functions/extractor';
import { NextResponse } from 'next/server';
import prisma from "@/services/prisma";


export async function GET(request: Request) {
  try {
    await prisma.$connect()
    const params = extractParams(request.url)

    if (!params["session"]) return NextResponse.json({ error: true, error_message: "Session ID doesn't exist", tasks: [] })
    if (typeof params["session"] != "string") return NextResponse.json({ error: true, error_message: "Session ID is incorrect", tasks: [] })

    let tasks;
    if (params["id"]) {
      tasks = await prisma.task.findMany({ where: { sessionId: params["session"], id: Number(params["id"]) } })

      if (tasks.length <= 0) {
        return NextResponse.json({ error: true, error_message: "Task Doesn't Exist", tasks: undefined })
      }

    } else {
      tasks = await prisma.task.findMany({ where: { sessionId: params["session"] } })
    }
    await prisma.$disconnect()
    return NextResponse.json({ error: false, error_message: "", tasks: params["id"] ? tasks[0] : tasks })
  } catch (_) {
    await prisma.$disconnect()
    return NextResponse.json({ error: true, error_message: "Unkown", tasks: [] })
  }
}


export async function POST(request: Request) {
  try {
    await prisma.$connect()
    const params = extractParams(request.url)

    if (!params["session"]) return NextResponse.json({ error: true, error_message: "Session ID doesn't exist", tasks: [] })
    if (typeof params["session"] != "string") return NextResponse.json({ error: true, error_message: "Session ID is incorrect", tasks: [] })

    if (!params["text"]) return NextResponse.json({ error: true, error_message: "Text attribute doesn't exist", tasks: [] })
    if (typeof params["text"] != "string") return NextResponse.json({ error: true, error_message: "Text attribute is incorrect", tasks: [] })
    if (params["text"].length > 75) return NextResponse.json({ error: true, error_message: "Text length overflow", tasks: [] })

    await prisma.task.create({ data: { sessionId: params["session"], text: params["text"], description: "" } })

    await prisma.$disconnect()
    return NextResponse.json({ error: true, error_message: "" })
  } catch (_) {
    await prisma.$disconnect()
    return NextResponse.json({ error: true, error_message: "Unkown" })
  }
}

export async function PUT(request: Request) {
  try {
    await prisma.$connect()
    const params = extractParams(request.url)

    if (!params["session"]) return NextResponse.json({ error: true, error_message: "Session ID doesn't exist", tasks: [] })
    if (typeof params["session"] != "string") return NextResponse.json({ error: true, error_message: "Session ID is incorrect", tasks: [] })

    if (!params["data"]) return NextResponse.json({ error: true, error_message: "Data object doesn't exist", tasks: [] })
    if (typeof params["data"] != "object") return NextResponse.json({ error: true, error_message: "Data is incorrect", tasks: [] })

    if (!params["id"]) return NextResponse.json({ error: true, error_message: "ID doesn't exist", tasks: [] })

    await prisma.task.update({ where: { sessionId: params["session"], id: Number(params["id"]) }, data: params["data"] })

    await prisma.$disconnect()
    return NextResponse.json({ error: false, error_message: "", success: true })
  } catch (_) {
    await prisma.$disconnect()
    return NextResponse.json({ error: true, error_message: "Unkown", succress: false })
  }
}
