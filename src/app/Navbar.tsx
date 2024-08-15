'use client'
import { auth } from "@/auth";
import { Box, Container, Flex } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBugSharp } from 'react-icons/io5'
import Session from "./Session";
export default function Navbar() {
    const currentPath = usePathname()
    const links = [
        { label: 'Dashboard', href: "/" },
        { label: "Issues", href: "/issues/list" }
    ]
    return (
        <nav className=" border-b mb-5 px-5 h-14 py-4">
            <Container>
                <Flex justify="between">
                    <Flex align="center" gap="4">
                        <Link href="/" legacyBehavior><IoBugSharp /></Link>
                        <ul className="flex space-x-6">
                            {links.map(link =>
                                <li key={link.href}>
                                    <Link
                                        className={classNames({
                                            'text-zinc-900': link.href === currentPath,
                                            'text-zinc-500': link.href !== currentPath,
                                            'hover:text-zinc-800 transition-colors': true
                                        })}
                                        href={link.href}
                                        legacyBehavior>{link.label}</Link>

                                </li>
                            )}

                        </ul>
                    </Flex>
                    <Session />
                </Flex>
            </Container>
        </nav>
    );
}