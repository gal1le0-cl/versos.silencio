import Sidebar from "../components/Sidebar";
import AutoFit from "../components/AutoFit";
import SimplePDFDisplay from "../components/SimplePDFDisplay";

export default function Fotopoemario() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#121418]">
      {/* Contenedor principal - tamaño fijo y centrado en la página */}
      <main className="bg-neutral-100 max-w-[1200px] w-[95%] lg:w-[85%] overflow-auto max-h-[98vh] lg:max-h-[90vh] lg:h-auto rounded-sm">
        <div className="flex flex-col w-full">
          {/* Barra de tareas arriba - móvil y tablet vertical */}
          <nav className="w-full border-b border-neutral-400 bg-neutral-100 p-4 lg:hidden flex-shrink-0 sticky top-0 z-10">
            <Sidebar />
          </nav>
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Sidebar en desktop y tablet horizontal */}
            <aside className="hidden lg:flex w-48 border-r border-neutral-400 bg-neutral-100 p-6 flex-shrink-0">
              <Sidebar />
            </aside>
            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-auto">
              <header className="px-4 py-5 flex-shrink-0">
                <h1 className="font-basset text-4xl lg:text-[55px] leading-none">
                  Fotopoemario
                </h1>
              </header>

              {/* Contenido principal */}
              <div className="p-4 lg:p-6">
                <SimplePDFDisplay pdfUrl="/fotopoemario-v1.pdf" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
