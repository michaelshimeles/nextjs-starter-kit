import ContactUs from '@/components/form/ContactUs';
import React from 'react'

interface ContactUsProps { }

const ContactUsPage: React.FC<ContactUsProps> = ({ }) => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 mt-[3rem] sm:px-6 lg:px-8 min-h-screen">
            <ContactUs />
        </div>
    );
}

export default ContactUsPage;