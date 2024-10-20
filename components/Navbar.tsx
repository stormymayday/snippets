import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";

async function Navbar() {
    const session = await auth();

    return (
        <nav className="py-8 flex items-center justify-between">
            <Link className="font-bold text-xl" href="/snippets">
                Home
            </Link>
            {/* <div className="flex items-center gap-3"> */}
            <p>Hello {session?.user?.id}</p>
            <form
                action={async () => {
                    "use server";

                    await signOut({
                        redirectTo: "/auth/login",
                    });
                }}
            >
                <Button type="submit">Sign Out</Button>
            </form>
            {/* </div> */}
        </nav>
    );
}
export default Navbar;
