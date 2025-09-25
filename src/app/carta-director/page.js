import Sidebar from "../components/Sidebar";
import AutoFit from "../components/AutoFit";
import Image from "next/image";


export default function CartaDirector() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#121418]">
      {/* Contenedor principal - tamaño fijo y centrado en la página */}
      <main className="bg-neutral-100 max-w-[1200px] w-[95%] lg:w-[85%] overflow-auto max-h-none lg:max-h-[90vh] lg:h-auto rounded-sm">
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
              <div className="flex-1 flex flex-col overflow-auto">
                <header className="px-4 py-5 flex-shrink-0">
                  <h1 className="font-basset text-4xl lg:text-[55px] leading-none">
                    Carta al Director
                  </h1>
                </header>

                {/* Contenido principal */}
                <div className="p-4 lg:p-6">
                  {/* Introducción del proyecto */}
                  <article className="max-w-4xl">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-3 h-3 bg-black rounded-full inline-block" />
                      <h2 className="font-bold text-lg">El Propósito de &ldquo;Versos del Silencio&rdquo;</h2>
                    </div>
                    
                    {/* Línea divisoria */}
                    <div className="h-px bg-neutral-300 mb-6"></div>

                    <div className="space-y-6 text-[#696969] leading-relaxed">
                      <p className="text-justify">
                        Estimado Director,
                      </p>
                      
                      <p className="text-justify">
                        Le escribo para presentarle &ldquo;Versos del Silencio&rdquo;, un proyecto que nace desde la necesidad urgente de preservar y honrar la memoria del exilio republicano español. En tiempos donde las narrativas históricas corren el riesgo de ser simplificadas o silenciadas, consideramos fundamental crear un espacio que dialogue con la complejidad de nuestra historia reciente.
                      </p>

                      <p className="text-justify">
                        Este proyecto multimedia combina fotografía, poesía y archivo documental para construir un relato fragmentado pero profundamente humano sobre el desarraigo, la resistencia y la memoria colectiva. No pretendemos ser una lección de historia tradicional, sino un ejercicio de memoria activa que interpela al presente desde las voces del pasado.
                      </p>

                      <p className="text-justify">
                        El fotopoemario que presentamos no ilustra meramente acontecimientos históricos; los interroga, los contradice, los abraza. Las imágenes —algunas históricas, otras intervenidas— dialogan con versos que surgen desde el corazón de la experiencia del exilio. Juntos conforman un archivo emocional que explora las múltiples dimensiones del destierro: la pérdida, la esperanza, la resistencia, la identidad fragmentada.
                      </p>

                      <p className="text-justify">
                        &ldquo;Fragmentos del olvido&rdquo;, nuestra galería de imágenes en blanco y negro, documenta la ruta del exilio republicano a través de una mirada contemporánea. Cada fotografía es un testimonio, cada encuadre una pregunta sobre lo que permanece y lo que se desvanece en el tiempo.
                      </p>

                      <p className="text-justify">
                        Creemos firmemente que la memoria no es nostalgia, sino herramienta de comprensión del presente. En un momento histórico donde los autoritarismos resurgen con nuevos rostros, rescatar las voces de quienes defendieron la democracia y la justicia social se convierte en un acto de resistencia contemporánea.
                      </p>

                      <p className="text-justify">
                        Este periódico digital nace como testimonio de una España que no se resigna, que no olvida, que no claudica. Somos herederos de la República, no por nostalgia romántica, sino por convicción política. Porque creemos en la justicia social, en la soberanía popular, en la dignidad de la ley frente al capricho del poder.
                      </p>

                      <p className="text-justify">
                        Le invitamos a acompañarnos en este recorrido por los diferentes lugares del exilio, explorando tanto la geografía física como la emocional de quienes tuvieron que reconstruir sus vidas lejos de la patria. A través de la fotografía, la poesía y el testimonio personal, &ldquo;Versos del Silencio&rdquo; se convierte en un puente entre generaciones, una forma de hacer presente lo aparentemente ausente.
                      </p>

                      <p className="text-justify">
                        En una época donde la palabra libre es más necesaria que nunca, este proyecto persiste como un acto de memoria activa y compromiso democrático. Porque recordar no es solo mirar hacia atrás, sino construir las bases éticas desde las cuales enfrentar el futuro.
                      </p>

                      <p className="text-justify mt-8">
                        Atentamente,<br />
                        <span className="font-bold text-black">Adrián Sánchez</span><br />
                        <span className="text-sm">Director y Editor de &ldquo;Versos del Silencio&rdquo;</span>
                      </p>

                      <div className="mt-8 p-4 bg-neutral-50 border-l-4 border-neutral-400">
                        <p className="text-sm italic">
                          &ldquo;La memoria es la única victoria posible contra el tiempo y la muerte. En cada verso rescatado, en cada imagen preservada, late el corazón de una España que se niega a desaparecer en el olvido.&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Línea divisoria final */}
                    <div className="h-px bg-neutral-300 my-8"></div>

                    {/* Información adicional del proyecto */}
                    <div className="bg-neutral-50 p-6 rounded-sm">
                      <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-neutral-400 rounded-full inline-block" />
                        Sobre el Proyecto
                      </h3>
                      <div className="space-y-3 text-sm text-[#696969]">
                        <p>
                          <strong>Año de creación:</strong> 2024-2025
                        </p>
                        <p>
                          <strong>Disciplinas:</strong> Fotografía documental, Poesía contemporánea, Archivo digital
                        </p>
                        <p>
                          <strong>Temática:</strong> Exilio republicano español, Memoria histórica, Resistencia democrática
                        </p>
                        <p>
                          <strong>Formato:</strong> Periódico digital interactivo, Fotopoemario multimedia
                        </p>
                        <p>
                          <strong>Objetivo:</strong> Preservar y transmitir la memoria del exilio republicano a través del arte y la literatura, estableciendo puentes entre pasado y presente para fortalecer la conciencia democrática contemporánea.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </AutoFit>
      </main>
    </div>
  );
}
