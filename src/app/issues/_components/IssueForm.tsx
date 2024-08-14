'use client'
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

// Lazy loading
const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
)

type IssueFormData = z.infer<typeof createIssueSchema>


export default function IssueForm({ issue }: { issue?: Issue }) {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmiting(true)
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data)
            else
                await axios.post('/api/issues', data)
            router.push("/issues")

            router.refresh()
        } catch (error) {
            setIsSubmiting(false)
            setError("Unexpected error occur")
        }
    })
    return (
        <div className="max-w-xl space-y-3">
            {error && <Callout.Root color="red">
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form
                onSubmit={onSubmit}
                className=" space-y-3 flex flex-col">
                <TextField.Root
                    placeholder="Title"
                    {...register('title')}
                    defaultValue={issue?.title}
                />
                <ErrorMessage>
                    {errors.title?.message}
                </ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={isSubmiting}>
                    {issue ? 'Update Issue' : "Submit New Issues"}{" "}
                    {isSubmiting && <Spinner />}
                </Button>
            </form>
        </div>
    )
}