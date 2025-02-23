import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { store } from "@/lib/store"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const { title, description } = await req.json()

  try {
    const course = await store.createCourse({
      title,
      description,
    })

    return NextResponse.json({ message: "Course created successfully", courseId: course.id }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ message: "Error creating course" }, { status: 500 })
  }
}

