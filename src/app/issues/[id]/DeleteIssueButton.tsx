'use client'
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function DeleteIssueButton({ issueId }: { issueId: number }) {
    const router = useRouter()
    const [error, setError] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete("/api/issues/" + issueId)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setDeleting(false)
            setError(true)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button
                        color="red"
                        disabled={deleting}
                    >Delete Issuex {deleting && <span className="loading loading-spinner loading-md"></span>}</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>Deletion Dialog</AlertDialog.Title>
                    <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone</AlertDialog.Description>
                    <Flex mt="5" gap="3">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color="red" onClick={deleteIssue}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
                    <Button
                        variant="soft"
                        color="gray"
                        mt="4"
                        onClick={() => setError(false)}

                    >
                        Ok
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}