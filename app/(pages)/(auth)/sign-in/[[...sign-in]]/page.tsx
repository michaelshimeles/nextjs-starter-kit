import PageWrapper from "@/components/wrapper/page-wrapper";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <PageWrapper >
            <div className="flex min-w-screen justify-center my-[5rem]">
                <SignIn fallbackRedirectUrl="/" signUpFallbackRedirectUrl="/dashboard" />
            </div>
        </PageWrapper>
    );
}