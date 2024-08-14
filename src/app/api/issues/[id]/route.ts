import { createIssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!issue)
        return NextResponse.json({ error: "Issue not found" }, { status: 404 })

    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })
    return NextResponse.json(updatedIssue)
}