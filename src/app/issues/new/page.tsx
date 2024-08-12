'use client'
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";

type IssueForm = z.infer<typeof createIssueSchema>

export default function NewPage() {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')
    return (
        <div className="max-w-xl space-y-3">
            {error && <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        router.push("/issues")
                    } catch (error) {
                        setError("Unexpected error occur")
                    }
                })}
                className=" space-y-3 flex flex-col">
                <TextField.Root placeholder="Title" {...register('title')} />
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button>Submit New Issues</Button>
            </form>
        </div>
    )
}