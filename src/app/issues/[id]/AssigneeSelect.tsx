'use client'
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from '@/components'

export default function AssigneeSelect() {
    const { data: users, error, isFetching, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get("/api/users").then(res => res.data),
        staleTime: 60 * 1000, // 60s
        retry: 5,
        retryDelay: 5 * 1000
    })

    if (isLoading) return <Skeleton height="2rem" />

    if (error) return null
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content >
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}

                </Select.Group>
            </Select.Content>
        </Select.Root >
    )
}