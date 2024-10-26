"use client";

import CardWrapper from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions";
import { useState, useCallback, useEffect } from "react";

function NewVerificationForm() {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(async () => {
        try {
            if (!token) {
                setError("Missing token");
                return;
            }

            const data = await newVerification(token);
            setSuccess(data.success);
            setError(data.error);
        } catch (error) {
            setError("Something went wrong!");
        }
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center justify-center">
                {!success && !error && <BeatLoader />}

                <FormSuccess message={success} />

                {!success && <FormError message={error} />}
            </div>
        </CardWrapper>
    );
}
export default NewVerificationForm;
