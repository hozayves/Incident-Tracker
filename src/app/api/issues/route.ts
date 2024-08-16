import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { createIssueSchema } from "../../validationSchema";
import { auth } from '@/auth'

export async function POST(request: NextRequest) {
    const session = await auth()
    if (!session)
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    if (!validation.success)
        return NextResponse.json({ error: validation.error.format() }, { status: 400 })

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, { status: 200 })
}