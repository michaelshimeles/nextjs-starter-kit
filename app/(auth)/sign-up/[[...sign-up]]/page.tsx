"use client"
import PageWrapper from "@/components/wrapper/page-wrapper";
import config from "@/config";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter()

    if (!config?.auth?.enabled) {
        router.back()
    }

    return (
        <PageWrapper >
            <div className="flex min-w-screen justify-center my-[5rem]">
                <SignUp />
            </div>
        </PageWrapper>
    );
}