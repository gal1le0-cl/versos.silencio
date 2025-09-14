import Sidebar from "./components/Sidebar";
import AutoFit from "./components/AutoFit";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#121418]">
      {/* Contenedor principal - tamaño fijo y centrado en la página */}
      <main className="bg-neutral-100 max-w-[1200px] w-[95%] lg:w-[85%] overflow-auto lg:overflow-hidden max-h-none lg:max-h-[90vh] lg:h-auto rounded-sm">
        <AutoFit maxScale={1} minScale={0.7} safety={0.98}>
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
            <div className="flex-1 flex flex-col lg:overflow-hidden">
              <header className="px-4 py-5 flex-shrink-0">
                <h1 className="font-basset text-4xl lg:text-[80px] leading-none">
                  VERSOS <br /> EN LA SOMBRA
                </h1>
              </header>
              <div className="flex flex-col lg:flex-row">
                {/* Contenido */}
                <div className="flex flex-col md:flex-row">
                  {/* Sección central */}
                  <section className="flex flex-col lg:flex-row gap-4 lg:gap-8 px-4 lg:px-6 py-6 relative">
                    {/* Fotopoemario */}
                    <article className="relative w-full lg:w-1/4 lg:min-w-[180px] lg:max-w-xs lg:flex-shrink-0">
                      <h2 className="font-bold flex items-center gap-2 text-base lg:text-lg">
                        <span className="w-3 h-3 bg-black rounded-full inline-block" />
                        Fotopoemario
                      </h2>
                      <Image
                        src="/poema1.jpg"
                        alt="Fotopoemario"
                        width={379}
                        height={195}
                        className="mt-4 w-full"
                        style={{ height: "auto" }}
                        unoptimized
                      />
                      <p className="italic text-sm mt-2">By Adrián Sánchez</p>
                      <p className="text-justify mt-2 text-sm leading-relaxed">
                        Este fotopoemario es un homenaje al exilio republicano
                        español, construido a partir de imágenes —históricas o
                        intervenidas— y versos que dialogan con ellas. Juntos
                        conforman un archivo emocional que explora el desarraigo, la
                        resistencia y la memoria colectiva. Los poemas no ilustran las
                        fotos, las interpelan, las contradicen, las abrazan, generando
                        un relato fragmentado pero profundamente humano.
                      </p>
                    </article>
                    
                    {/* Carta al director */}
                    <article className="relative flex-1 flex flex-col min-w-0">
                      <h2 className="font-bold flex items-center gap-2 text-base lg:text-lg">
                        <span className="w-3 h-3 bg-black rounded-full inline-block" />
                        Carta al director
                      </h2>
                      <div className="mt-4 w-full">
                        <Image
                          src="/poema1.jpg"
                          alt="Carta al director"
                          width={379}
                          height={195}
                          className="w-full h-auto max-w-full object-cover"
                          style={{ 
                            maxHeight: "300px",
                            height: "auto"
                          }}
                          unoptimized
                        />
                      </div>
                      <p className="text-justify mt-2 text-sm leading-relaxed">
                        En tiempos de oscuridad, la palabra libre es un acto de
                        resistencia. Este periódico nace —y persiste— como testimonio
                        de una España que no se resigna, que no olvida, que no
                        claudica. Somos hijos de la República, no por nostalgia, sino
                        por convicción. Porque creemos en la justicia social, en la
                        soberanía del pueblo, en la dignidad de la ley frente al
                        capricho del poder.
                      </p>
                      <p className="text-justify mt-2 text-sm leading-relaxed">
                        Acompáñenos en este periódico por los diferentes lugares del
                        exilio, explorando la ruta del exilio mediante fotografía,
                        poesía y desde el corazón.
                      </p>
                      <button className="flex items-center gap-2 text-sm mt-4 hover:text-gray-600 transition-colors">
                        <span className="rotate-180">↩</span> Leer más
                      </button>
                    </article>
                  </section>
                  
                  {/* Sección derecha */}
                  <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-neutral-400 bg-neutral-200 p-4 lg:p-6 mb-4 lg:mb-0 lg:flex-shrink-0 self-start">
                    <h2 className="mt-2 lg:mt-4 font-bold text-lg lg:text-xl">Fragmentos del olvido</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-3 h-3 bg-black rounded-full inline-block" />
                      <span>Ver</span>
                    </div>
                    <p className="text-sm mt-2 leading-relaxed">
                      Introdúzcase en el mundo del collage con esta recopilación de
                      fotografías en blanco y negro realizadas desde la ruta al exilio
                      republicano español.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <Image
                          key={i}
                          src={`https://source.unsplash.com/200x200/?memorial,history&sig=${i}`}
                          alt="Collage"
                          width={200}
                          height={200}
                          className="object-cover w-full h-20 lg:h-24 rounded-sm"
                          unoptimized
                        />
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
          </div>
        </AutoFit>
      </main>
    </div>
  );
}
