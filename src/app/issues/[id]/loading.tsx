import { Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default async function LoadingIssueDetailsPage() {

    return (
        <Box className="max-w-xl">
            <Skeleton height="2rem" />
            <Flex gap="3" align="center">
                <Skeleton width="3rem" />
                <Skeleton width="8rem" />
            </Flex>
            <Card className="prose lg:prose-lg prose-zinc" mt="4">
                <Skeleton count={5} />
            </Card>
        </Box>
    )
}