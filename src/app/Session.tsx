
import { auth } from "@/auth"
import { Box } from "@radix-ui/themes"
import Link from "next/link"

async function Session() {
    const session = await auth()
    return (
        <Box>
            {!session && <Link href="/api/auth/signin">LogIn</Link>}
            {session && <Link href="api/auth/signout">Logout</Link>}
        </Box>
    )
}

export default Session