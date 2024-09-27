import Link from "next/link";

function Navbar() {
    return (
        <nav className="py-8 px-12">
            <Link className="font-bold text-xl" href="/">
                Home
            </Link>
        </nav>
    );
}
export default Navbar;
