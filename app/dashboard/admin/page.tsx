import { Card, CardContent } from "@/components/ui/card"
import { getUsers } from "@/app/lib/db";

export default async function Page() {
    const users = await getUsers();
    return (
        <div className="container mx-auto px-4 py-8">
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <Card>
                        <CardContent className="pt-6">
                            <h1 className="text-2xl font-bold">Admin</h1>
                            <div className="mt-4">
                                {users.map((user) => (
                                    <div key={user.id} className="mb-2">
                                        <p><strong>Name:</strong> {user.name}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}
