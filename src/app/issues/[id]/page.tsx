import { notFound } from "next/navigation"
import prisma from "../../../../prisma/client"
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes"
import IssueStatusBadge from "@/components/IssueStatusBadge"
import Markdown from "react-markdown"
import delay from "delay"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

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
        <Grid columns={{ initial: "1", md: '2' }} gap="3">
            <Box>
                <Heading>{issue.title}</Heading>
                <Flex gap="3" align="center">
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className="prose lg:prose-lg prose-zinc" mt="4">
                    <Markdown>{issue.description}</Markdown>
                </Card>
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>
        </Grid>
    )
}