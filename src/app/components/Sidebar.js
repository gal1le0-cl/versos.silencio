import Link from 'next/link';

function Sidebar() {
    return (
        <div className="h-full flex flex-col justify-between">
            <nav className="flex flex-col gap-4 text-base sidebar-inter-medium leading-tight">
                <ul className="flex flex-col gap-3">
                    <li>
                        <Link href="/" className="flex items-center gap-2 hover:text-neutral-600 transition-colors">
                            <span>Home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="/carta-director" className="flex items-center gap-2 hover:text-neutral-600 transition-colors">
                            <span>Carta al <br /> Director</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </li>
                    
                    
                    <li>
                        <Link href="/fotopoemario" className="flex items-center gap-2 hover:text-neutral-600 transition-colors">
                            <span>Fotopoemario</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="/collage" className="flex items-center gap-2 hover:text-neutral-600 transition-colors">
                            <span>Fragmentos <br /> del olvido</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link href="/" className="flex items-center gap-2 hover:text-neutral-600 transition-colors">
                            <span>Versos en la <br /> ruta</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <span className="flex items-center text-gray-400 gap-2 cursor-not-allowed opacity-50">
                            <span>Cartografía <br /> del silencio</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </span>
                    </li>
                </ul>
            </nav>
            <div className="mt-8 border-t border-neutral-400 pt-4">
                <h3 className="font-bold flex items-center gap-2">
                    <span className="w-3 h-3 bg-black inline-block" />
                    Traducir a:
                </h3>
                <div className="flex gap-2 mt-2">
                    <button className="w-6 h-4 bg-black hover:ring-1 hover:ring-offset-1 hover:ring-black transition-all" />
                    <button className="w-6 h-4 bg-gray-400 hover:ring-1 hover:ring-offset-1 hover:ring-black transition-all" />
                    <button className="w-6 h-4 bg-gray-600 hover:ring-1 hover:ring-offset-1 hover:ring-black transition-all" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
