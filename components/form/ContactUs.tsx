"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useRef } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

const ContactUsForm = z.object({
    firstName: z.string().min(3, {
        message: "First name is required"
    }),
    lastName: z.string().min(3, {
        message: "Last name is required"
    }),
    message: z.string().min(3, {
        message: "Message is required"
    }),
    email: z.string().email().min(5, {
        message: "Valid email is required"
    })
})

type ContactUsFormInput = z.infer<typeof ContactUsForm>

export default function ContactUs() {

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset, } = useForm<ContactUsFormInput>({
        resolver: zodResolver(ContactUsForm),
        defaultValues: {
            firstName: "",
            lastName: "",
            message: "",
            email: ""
        }
    });
    const form = useRef();
    const { toast } = useToast()

    const onSubmit = async (data: z.infer<typeof ContactUsForm>) => {

        try {
            const response = await fetch(`/api/store-email`, {
                method: "POST",
                body: JSON.stringify({
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                    email: data?.email,
                    message: data?.message,
                    source: "Contact Us"
                })
            })

            const result = await response.json()

            return result
        } catch (error) {
            throw new Error("Storing Emails in db Frontend Error", error as any);
        }

    }
    return (
        <div className="flex items-center justify-center p-2">
            <Card>
                <CardContent>
                    <div className="space-y-8 pt-7">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold">
                                Contact Us
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Fill out the form below and we&apos;ll get back to you as soon as possible.
                            </p>
                        </div>
                        <form ref={form as any} onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>
                                            First name
                                        </Label>
                                        {errors?.firstName?.message && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label>
                                            Last name
                                        </Label>
                                        <Input {...register("lastName", { required: true })} placeholder="Enter your last name" />
                                        {errors?.lastName?.message && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>
                                        Email
                                    </Label>
                                    <Input {...register("email", { required: true })} placeholder="Enter your email" type="email" />
                                    {errors?.email?.message && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>
                                        Message
                                    </Label>
                                    <Textarea className="min-h-[100px]" {...register("message", { required: true })} placeholder="Enter your message" />
                                    {errors?.message?.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                                </div>
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                                    Send message
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
