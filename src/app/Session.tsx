
import { auth } from "@/auth"
import { Avatar, Box, DropdownMenu, Flex } from "@radix-ui/themes"
import Link from "next/link"

async function Session() {
    const session = await auth()
    return (
        <Box>
            {!session &&
                <Link href="/api/auth/signin">LogIn</Link>
            }
            {session &&
                (
                    <Flex gap="3" align="center">
                        {/* <Image src={session.user?.image!} alt="" width="100" height="100" /> */}
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <Avatar src={session.user?.image!} alt="" fallback="?" size="2" radius="full" />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content size="1">
                                <DropdownMenu.Item className="font-semibold">{session.user?.name}</DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>

                                <DropdownMenu.Separator />
                                <DropdownMenu.Item color="red">
                                    <Link href="api/auth/signout" replace>Logout</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Flex>
                )
            }
        </Box>
    )
}

export default Session