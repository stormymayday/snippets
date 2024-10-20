import Link from "next/link";

function Navbar() {
    return (
        <nav className="py-8 flex items-center justify-between">
            <Link className="font-bold text-xl" href="/snippets">
                Home
            </Link>
            <p>Sign Out</p>
        </nav>
    );
}
export default Navbar;
