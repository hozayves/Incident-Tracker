'use client'
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
    title: string,
    description: string
}

export default function NewPage() {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    return (
        <form
            onSubmit={handleSubmit(async (data) => {
                await axios.post('/api/issues', data)
                router.push("/issues")
            })}
            className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title" {...register('title')} />
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />
            <Button>Submit New Issues</Button>
        </form>
    )
}