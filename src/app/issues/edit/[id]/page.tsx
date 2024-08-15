import { notFound } from "next/navigation";
import prisma from "../../../../../prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// Lazy loading
const IssueForm = dynamic(
    () => import('../../_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)

export default async function EditIssuePage({ params: { id } }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique(
        {
            where: {
                id: parseInt(id)
            }
        }
    )
    if (!issue)
        notFound()
    return (
        <IssueForm issue={issue} />
    )
}