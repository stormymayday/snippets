"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

function NewVerificationForm() {
    const searchParams = useSearchParams();

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    );
}
export default NewVerificationForm;
