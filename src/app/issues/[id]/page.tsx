import { auth } from "@/auth"
import { Box, Flex, Grid } from "@radix-ui/themes"
import delay from "delay"
import { notFound } from "next/navigation"
import prisma from "../../../../prisma/client"
import AssigneeSelect from "./AssigneeSelect"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

export default async function IssueDetailPage({ params: { id } }: { params: { id: string } }) {
    const session = await auth()
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
            {session && <Box>
                <Flex direction="column" gap="3">
                    <AssigneeSelect issue={issue} />
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />

                </Flex>
            </Box>}
        </Grid>
    )
}