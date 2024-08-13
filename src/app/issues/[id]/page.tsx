import { notFound } from "next/navigation"
import prisma from "../../../../prisma/client"
import { Card, Flex, Heading, Text } from "@radix-ui/themes"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import Markdown from "react-markdown"
import delay from "delay"

export default async function IssueDetailPage({ params: { id } }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!issue)
        notFound()

    await delay(2000)
    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" align="center">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose lg:prose-lg prose-zinc" mt="4">
                <Markdown>{issue.description}</Markdown>
            </Card>
        </div>
    )
}