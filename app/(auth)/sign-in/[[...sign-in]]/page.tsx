import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex min-w-screen justify-center my-[5rem]">
            <SignIn />
        </div>
    );
}