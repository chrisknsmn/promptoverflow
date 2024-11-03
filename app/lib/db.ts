import prisma from "@/lib/db";

export async function initUser(user: any) {
    let userData = await getUser(user);
    if (userData == null) {
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
            },
        });
        userData = await getUser(user);
    }
    return userData;
}

export async function getUser(user: any) {
    let userData = await prisma.user.findUnique({
        where: {
            email: user.emailAddresses[0].emailAddress,
        },
        select: {
            id: true,
            email: true,
            name: true,
        },
    });
    return userData;
}

export async function getUsers() {
    const users = await prisma.user.findMany();
    return users;
}

