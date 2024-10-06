import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TITLE_TAILWIND_CLASS } from "@/utils/constants"

export function AccordionComponent() {
    return (
        <div className="flex flex-col w-[70%] lg:w-[50%]">
            <h2 className={`${TITLE_TAILWIND_CLASS} mt-2 font-semibold text-center tracking-tight dark:text-white text-gray-900`}>
                Frequently Asked Questions (FAQs)
            </h2>
            <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className="font-medium">Do I get access to this landing page in the starter kit?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Yes, this page isn&apos;t even a real landing page more so a template for you to build on</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
