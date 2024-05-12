"use client"
import PageWrapper from "@/components/Container/PageWrapper";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <PageWrapper >
            <div className="flex min-w-screen justify-center my-[5rem]">
                <SignIn />
            </div>
        </PageWrapper>
    );
}