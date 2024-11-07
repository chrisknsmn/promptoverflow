import prisma from "@/lib/db";
import SearchContainer from "@/components/layout/search/tags/searchcontainer";

export default async function Page() {
  
  const tags = await prisma.tag.findMany({
    orderBy: [
      {
        postCount: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  return (
    <div className="py-2 px-4 min-h-[100vh]">
      <SearchContainer tags={tags} />
    </div>
  );
  
}