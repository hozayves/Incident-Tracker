'use client'
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function NewPage() {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            {/* <SimpleMDE placeholder="Description" /> */}
            <SimpleMDE placeholder="Description" />
            <Button>Submit New Issues</Button>
        </div>
    )
}