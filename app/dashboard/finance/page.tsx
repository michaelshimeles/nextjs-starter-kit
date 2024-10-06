"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  category: z.string(),
})

export default function Category() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {


      form.reset()
      return
    } catch (error) {
      return error
    }
  }


  return (
    <main className="flex min-w-screen p-4 flex-col items-center justify-between ">
      <div className="flex flex-col mb-[5rem] w-full">
        <h1 className=" text-3xl font-semibold tracking-tight">
          Publish
        </h1>
        <p className="leading-7 text-sm dark:text-gray-400">
          Get ready to publish articles that have been written and saved
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px] space-y-3 mt-[1rem]">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter random piece of information</FormLabel>
                  <FormControl>
                    <Input  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </main>
  )
}