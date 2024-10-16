"use client";

import { Button } from "@/components/ui/button";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Social() {
    return (
        <div className="w-full flex items-center gap-x-2">
            <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => {}}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => {}}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
}
export default Social;
