import { NextResponse } from "next/server"

import prisma from "@/app/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(
    request: Request
) {
    const CurrentUser = await getCurrentUser()
    
    if (!CurrentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    const {
        title,
        description,
        imageSrc,
        category,
        songCount,
        memberCount,
        trainingCount,
        location,
        age
    } = body

    // Object.keys(body).forEach((value: any) => {
    //     if (!body[value]) {
    //         NextResponse.error
    //     }
    // })


    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            songCount,
            memberCount,
            trainingCount,
            locationValue: location.value,
            age : parseInt(age, 10),
            userId: CurrentUser.id
        }
    })
    return NextResponse.json(listing);

}

