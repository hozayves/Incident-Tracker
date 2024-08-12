import { Button, TextArea, TextField } from "@radix-ui/themes";

export default function NewPage() {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            <TextArea placeholder="Description" />
            <Button>Submit New Issues</Button>
        </div>
    )
}