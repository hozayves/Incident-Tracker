import { Box, Grid } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"
import prisma from "../../../../prisma/client"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

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
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditIssueButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}