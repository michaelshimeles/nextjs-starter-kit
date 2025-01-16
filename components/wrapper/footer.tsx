export default function Footer() {
    return (
        <footer className="bg-[#fbcfe8] text-gray-800 py-6">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8 pt-8 border-t border-gray-300">
                    <ul className="flex flex-wrap justify-center gap-4 text-xs">
                        <li>
                            <a 
                                href="/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition hover:text-pink-600"
                            >
                                Regulamin
                            </a>
                        </li>
                        <li>
                            <a 
                                href="/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="transition hover:text-pink-600"
                            >
                                Polityka prywatności
                            </a>
                        </li>
                    </ul>
                    <p className="mt-8 text-xs text-center">&copy; 2025. Woopla All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
