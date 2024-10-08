import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import prisma from "../../prisma/client"
import Link from "next/link"
import { IssueStatusBadge } from "@/components"


export default async function LatestIssues() {
    const issues = await prisma.issue.findMany(
        {
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                assignedToUser: true
            }
        }
    )
    return (
        <Card>
            <Heading size="5" mb="4">Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify="between">
                                    <Flex direction="column" align="start">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar
                                            src={issue.assignedToUser.image!}
                                            fallback="?"
                                            alt=""
                                            radius="full"
                                            size="2"
                                        />
                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}