function Sidebar() {
    return (
        <div className="h-full flex flex-col justify-between">
            <nav className="flex flex-col gap-4 text-base sidebar-inter-medium leading-tight">
                <ul className="flex flex-col gap-3">
                    <li>Carta al <br /> Director</li>
                    <li>Cartografía <br /> del silencio</li>
                    <li>Versos en la <br /> ruta</li>
                    <li>Fotopoemario</li>
                    <li>Fragmentos <br /> del olvido</li>
                </ul>
            </nav>
            <div className="mt-8 border-t border-neutral-400 pt-4">
                <h3 className="font-bold flex items-center gap-2">
                    <span className="w-3 h-3 bg-black inline-block" />
                    Traducir a:
                </h3>
                <div className="flex gap-2 mt-2">
                    <div className="w-6 h-4 bg-black" />
                    <div className="w-6 h-4 bg-gray-400" />
                    <div className="w-6 h-4 bg-gray-600" />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
