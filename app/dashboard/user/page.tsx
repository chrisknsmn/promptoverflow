import { Card, CardContent } from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";
import { initUser } from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function Page() {

    //user from clerk 
    const user = await currentUser();
    // Get user data from supabase or redirect to home
    let userData;
    if (user) {
        userData = await initUser(user);
    } else {
        redirect("/");
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <Card>
                        <CardContent className="pt-6">
                            <h1 className="text-2xl font-bold">User Details</h1>
                            {userData ? (
                                <div className="mt-4">
                                    <p><strong>Name:</strong> {userData.name}</p>
                                    <p><strong>Email:</strong> {userData.email}</p>
                                </div>
                            ) : (
                                <p>No user data available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}