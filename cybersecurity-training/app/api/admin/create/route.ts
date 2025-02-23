import { NextResponse } from "next/server"
import { store } from "@/lib/store"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const adminUser = await store.createAdminUser({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: "Admin user created successfully", userId: adminUser.id }, { status: 201 })
  } catch (error) {
    console.error("Admin user creation error:", error)
    return NextResponse.json({ message: "Error creating admin user" }, { status: 500 })
  }
}

