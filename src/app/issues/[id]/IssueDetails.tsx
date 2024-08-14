import { IssueStatusBadge } from "@/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import Markdown from "react-markdown";


export default function IssueDetails({ issue }: { issue: Issue }) {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" align="center">
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose lg:prose-lg prose-zinc" mt="4">
                <Markdown>{issue.description}</Markdown>
            </Card>
        </>
    )
}