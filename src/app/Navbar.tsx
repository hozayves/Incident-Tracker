
import { Container, Flex } from "@radix-ui/themes";
import LeftNavbar from "./LeftNavbar";
import Session from "./Session";
export default function Navbar() {

    return (
        <nav className=" border-b mb-5 px-5 h-14 py-4">
            <Container>
                <Flex justify="between">
                    <LeftNavbar />
                    <Session />
                </Flex>
            </Container>
        </nav>
    );
}