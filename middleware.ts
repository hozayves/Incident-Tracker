import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {

}

export const config = {
    matcher: [
        '/issues/new'
    ]
}