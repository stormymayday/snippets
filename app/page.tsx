import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function LandingPage() {
    await delay(5000);
    return (
        <main className="h-[100vh] flex flex-col items-center justify-center">
            <div className="space-y-6 text-center">
                <h1
                    className={cn(
                        "text-6xl font-semibold drop-shadow-md",
                        poppins.className
                    )}
                >
                    💻 Snippets
                </h1>
                <p className="text-lg">Your Code, Just a Snippet Away!</p>
                <div>
                    <LoginButton>
                        <Button variant="default" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    );
}
