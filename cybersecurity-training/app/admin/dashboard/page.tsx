import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="space-y-4">
        <Button asChild>
          <Link href="/admin/courses/create">Create New Course</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/courses">Manage Courses</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/users">Manage Users</Link>
        </Button>
      </div>
    </div>
  )
}

