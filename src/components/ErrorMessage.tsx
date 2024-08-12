import { Text } from "@radix-ui/themes"
import { PropsWithChildren, ReactNode } from "react"

export default function ErrorMessage({ children }: PropsWithChildren) {
    if (!children) return null
    return (
        <Text color="red" as="p">{children}</Text>
    )
}   