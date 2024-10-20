import Link from "next/link";
import { auth, signOut } from "@/auth";

function Navbar() {
    return (
        <nav className="py-8 flex items-center justify-between">
            <Link className="font-bold text-xl" href="/snippets">
                Home
            </Link>
            <div>
                {/* <p>{auth.name}</p> */}
                <form
                    action={async () => {
                        "use server";

                        await signOut();
                    }}
                >
                    <button type="submit">Sign Out</button>
                </form>
            </div>
        </nav>
    );
}
export default Navbar;
