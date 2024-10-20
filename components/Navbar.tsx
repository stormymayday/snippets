import Link from "next/link";
import { signOut } from "@/auth";

function Navbar() {
    return (
        <nav className="py-8 flex items-center justify-between">
            <Link className="font-bold text-xl" href="/snippets">
                Home
            </Link>
            <form
                action={async () => {
                    "use server";

                    await signOut();
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </nav>
    );
}
export default Navbar;
