import { Box, Flex, Grid } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"
import prisma from "../../../../prisma/client"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"
import DeleteIssueButton from "./DeleteIssueButton"

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
        <Grid columns={{ initial: "1", sm: '5' }} gap="3">
            <Box className="md:col-span-4">
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <Flex direction="column" gap="3">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />

                </Flex>
            </Box>
        </Grid>
    )
}