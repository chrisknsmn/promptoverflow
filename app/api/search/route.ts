// app/api/search/route.ts
import { NextResponse } from "next/server"
import { globalSearch } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const types = searchParams.get("types")?.split(",") as Array<'posts' | 'tags'> | undefined
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")

  if (!query) {
    return NextResponse.json({ error: "Search query is required" }, { status: 400 })
  }

  try {
    const results = await globalSearch(query, {
      page,
      limit,
      types: types || ['posts', 'tags']
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    )
  }
}