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
                Często zadawane pytania (FAQs)
            </h2>
            <Accordion type="single" collapsible className="w-full mt-2">
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className="font-medium">Jak utworzyć nowe wydarzenie?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Aby utworzyć nowe wydarzenie, przejdź do strony "Stwórz Wydarzenie" z poziomu swojego panelu. Wypełnij szczegóły wydarzenia, takie jak tytuł, opis, lokalizacja i data, a następnie kliknij "Zatwierdź", aby zapisać wydarzenie.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger><span className="font-medium"> Jak dodać prezenty do wydarzenia?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Aby dodać prezenty, przejdź do sekcji prezentów wydarzenia i kliknij "Dodaj Prezent". Wypełnij szczegóły prezentu i zatwierdź formularz, aby dodać go do listy prezentów wydarzenia.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger><span className="font-medium">Jak mogę udostępnić moje wydarzenie innym?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>Skorzystaj z funkcji "Udostępnij Wydarzenie", który jest widoczny na stronie utworzonego wydarzenia, aby uzyskać link do udostępnienia lub kod QR, który możesz wysłać swoim gościom.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger><span className="font-medium">Jak skontaktować się z pomocą techniczną?</span></AccordionTrigger>
                    <AccordionContent>
                        <p></p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
