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
                    <AccordionTrigger>How does RankBoost AI enhance the quality of AI-generated content?</AccordionTrigger>
                    <AccordionContent>
                        At RankBoost AI, we&apos;ve developed a sophisticated methodology that combines the latest in AI technology, including perplexity analysis, OpenAI&apos;s nuanced attribute creation, and Anthropic&apos;s Claude for in-depth prompting. This ensures our content is not only highly relevant and engaging but also adheres to the highest quality standards.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What quality assurance measures does RankBoost AI implement?</AccordionTrigger>
                    <AccordionContent>
                        We prioritize quality at every stage of the content creation process. From comprehensive topic research and intent analysis to creating detailed outlines and finalizing content through a rigorous sanitizing phase, RankBoost AI ensures every piece of content is polished, accurate, and impactful.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
