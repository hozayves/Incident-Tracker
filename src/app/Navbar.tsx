'use client'
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoBugSharp } from 'react-icons/io5'
export default function Navbar() {
    const currentPath = usePathname()
    const links = [
        { label: 'Dashboard', href: "/" },
        { label: "Issues", href: "/issues" }
    ]
    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href="/" legacyBehavior><IoBugSharp /></Link>
            <ul className="flex space-x-6">
                {links.map(link =>
                    <Link
                        key={link.href}
                        className={classNames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors': true
                        })}
                        href={link.href}
                        legacyBehavior>{link.label}</Link>)}

            </ul>
        </nav>
    );
}