export default function Footer() {
    return (
        <footer className="border-t dark:bg-black">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8 border-t pt-8">
                    <ul className="flex flex-wrap gap-4 text-xs">
                        <li>
                            <a 
                                href="/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition hover:opacity-75"
                            >
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition hover:opacity-75"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                    <p className="mt-8 text-xs">&copy; 2025. Woopla All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
