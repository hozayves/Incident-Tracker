import { patchIssueSchema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { auth } from "@/auth";


export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)
    // if (!session)
    //     return NextResponse.json({}, { status: 401 })
    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 })

    const { assignedToUserId, title, description } = body
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } })
        if (!user)
            return NextResponse.json({ error: "Invalid user." }, { status: 400 })
    }

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
            title,
            description,
            assignedToUserId
        }
    })
    return NextResponse.json(updatedIssue)
}
export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    const session = await auth()
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    if (!session)
        return NextResponse.json({}, { status: 401 })
    if (!issue)
        return NextResponse.json({ error: "Issue does not exist" }, { status: 404 })

    await prisma.issue.delete(
        {
            where: {
                id: issue.id
            }
        }
    )
    return NextResponse.json({})
}