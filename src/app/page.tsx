import Pagination from "@/components/Pagination";
import Image from "next/image";

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  return (
    <>
      <div>Hello World!</div>
      <Pagination itemCount={140} pageSize={10} currentPage={parseInt(searchParams.page)} />
    </>
  );
}
