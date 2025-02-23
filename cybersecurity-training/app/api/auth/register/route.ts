import { NextResponse } from "next/server"
import { store } from "@/lib/store"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  try {
    const existingUser = await store.getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await store.createUser({
      name,
      email,
      password: hashedPassword,
      role: "USER",
    })

    return NextResponse.json({ message: "User created successfully", userId: user.id }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Error creating user" }, { status: 500 })
  }
}

