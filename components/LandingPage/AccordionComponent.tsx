import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionComponent() {
    return (
        <div className="flex flex-col w-[70%] lg:w-[50%]">
            <h1 className="scroll-m-20 pb-[3rem] text-center text-3xl font-semibold tracking-tight lg:text-4xl">
                Frequently Asked Questions (FAQs)
            </h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Do I get access to this landing page in the starter kit?</AccordionTrigger>
                    <AccordionContent>
                        Yes, this page isn&apos;t even a real landingpage more so a template for you to build on
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
