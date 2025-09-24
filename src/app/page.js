import Sidebar from "./components/Sidebar";
import AutoFit from "./components/AutoFit";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
                  <h1 className="font-basset text-4xl lg:text-[80px] leading-none">
                    VERSOS <br /> DEL SILENCIO
                  </h1>
                </header>
                <div className="flex flex-col lg:flex-row">
                  {/* Contenido */}
                  <div className="flex flex-col md:flex-row">
                    {/* Sección central */}
                    <section className="flex flex-col lg:flex-row gap-2 lg:gap-4 px-4 lg:px-6 py-6 relative">
                      {/* Fotopoemario */}
                      <article className="relative w-full lg:w-1/4 lg:min-w-[180px] lg:max-w-xs lg:flex-shrink-0">
                        <h2 className="font-bold flex items-center gap-2 text-base lg:text-lg">
                          <span className="w-3 h-3 bg-black rounded-full inline-block" />
                          Fotopoemario
                        </h2>

                        {/* Línea divisoria */}
                        <div className="h-px bg-neutral-300 my-3"></div>

                        <Image
                          src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704918/DSCN5973_fmgxwr.jpg"
                          alt="Fotopoemario"
                          width={379}
                          height={195}
                          className="mt-1 w-full"
                          style={{ height: "auto" }}
                          unoptimized
                        />
                        <p className="italic text-sm mt-2">By Adrián Sánchez</p>
                        <p className="text-justify mt-2 text-[#696969] text-sm leading-relaxed">
                          Este fotopoemario es un homenaje al exilio republicano
                          español, construido a partir de imágenes —históricas o
                          intervenidas— y versos que dialogan con ellas. Juntos
                          conforman un archivo emocional que explora el
                          desarraigo, la resistencia y la memoria colectiva. Los
                          poemas no ilustran las fotos, las interpelan, las
                          contradicen, las abrazan, generando un relato
                          fragmentado pero profundamente humano.
                        </p>



                        {/* Línea divisoria sutil antes del botón */}
                        <div className="h-px bg-neutral-300 my-3"></div>

                        <button className="flex items-center gap-2 text-sm mt-2 hover:text-gray-600 transition-colors">
                          <a
                            href="/fotopoemario"
                            className="flex items-center gap-2 font-bold"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 10l5 5-5 5" />
                              <path d="M4 4v7a4 4 0 004 4h12" />
                            </svg>
                            Ver 
                          </a>
                        </button>
                      </article>

                      {/* Línea divisoria - solo visible en desktop */}
                      <div className="hidden lg:block w-px bg-neutral-300 mx-0.5 self-stretch"></div>

                      {/* Línea divisoria - solo visible en móvil */}
                      <div className="lg:hidden w-full h-px bg-neutral-300 my-2"></div>

                      {/* Carta al director */}
                      <article className="relative flex-1 flex flex-col min-w-0">
                        <h2 className="font-bold flex items-center gap-2 text-base lg:text-lg">
                          <span className="w-3 h-3 bg-black rounded-full inline-block" />
                          Carta al director
                        </h2>

                        {/* Línea divisoria */}
                        <div className="h-px bg-neutral-300 my-3"></div>

                        <div className="mt-1 w-full">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758733384/poema2_1_zswx7v.png"
                            alt="Carta al director"
                            width={379}
                            height={195}
                            className="w-full h-auto max-w-full object-cover"
                            style={{
                              maxHeight: "300px",
                              height: "auto",
                            }}
                            unoptimized
                          />
                        </div>
                        <p className="text-justify mt-2 text-sm text-[#696969] leading-relaxed">
                          En tiempos de oscuridad, la palabra libre es un acto
                          de resistencia. Este periódico nace —y persiste— como
                          testimonio de una España que no se resigna, que no
                          olvida, que no claudica. Somos hijos de la República,
                          no por nostalgia, sino por convicción. Porque creemos
                          en la justicia social, en la soberanía del pueblo, en
                          la dignidad de la ley frente al capricho del poder.
                        </p>
                        <p className="text-justify mt-2 text-[#696969] text-sm leading-relaxed">
                          Acompáñenos en este periódico por los diferentes
                          lugares del exilio, explorando la ruta del exilio
                          mediante fotografía, poesía y desde el corazón.
                        </p>

                        {/* Línea divisoria sutil antes del botón */}
                        <div className="h-px bg-neutral-300 my-3"></div>

                        <button className="flex items-center gap-2 text-sm mt-2 hover:text-gray-600 transition-colors">
                          <a
                            href="/carta-director"
                            className="flex items-center gap-2 font-bold"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                            >
                              <path d="M15 10l5 5-5 5" />
                              <path d="M4 4v7a4 4 0 004 4h12" />
                            </svg>
                            Leer más
                          </a>
                        </button>
                      </article>
                    </section>

                    {/* Sección derecha */}
                    <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-neutral-400  p-4 lg:p-6 mb-4 lg:mb-0 lg:flex-shrink-0 self-start">
                      <div className="flex items-center justify-between">
                        <h2 className="mt-2 lg:mt-4 font-bold text-lg lg:text-xl">
                          Fragmentos <br></br> del olvido
                        </h2>
                        <Link href="/collage" className="flex items-center gap-2 mt-2 hover:text-gray-600 transition-colors cursor-pointer">
                          <span className="w-3 h-3 bg-black rounded-full inline-block" />
                          <span>Ver</span>
                        </Link>
                      </div>

                      {/* Línea divisoria */}
                      <div className="h-px bg-neutral-300 my-3"></div>

                      <p className="text-sm leading-relaxed">
                        Introdúzcase en el mundo del collage con esta
                        recopilación de fotografías en blanco y negro realizadas
                        desde la ruta al exilio republicano español.
                      </p>
                      {/* Collage de Fotos */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-[55px] sm:auto-rows-[60px] md:auto-rows-[75px] lg:auto-rows-[85px] gap-1 sm:gap-2 py-2 sm:py-3 max-h-[350px] sm:max-h-[450px] md:max-h-[500px] overflow-y-auto">
                        {/* Foto 1: Ferrocarril - Normal */}
                        <div className="col-span-2 sm:col-span-2 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704889/11_co1fj6_ighcdg.jpg"
                            alt="Ferrocarril"
                            width={300}
                            height={150}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            priority
                          />
                        </div>

                        {/* Foto 2: Horizontal */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704890/10_burb5b_gekrai.jpg"
                            alt="Foto 2"
                            width={150}
                            height={100}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>

                        {/* Foto 3: Vertical */}
                        <div className="col-span-1 row-span-2 sm:row-span-2 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704915/DSCN5892_ucnkjg.jpg"
                            alt="Lápida Edith Eckstein"
                            width={100}
                            height={200}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            loading="eager"
                          />
                        </div>

                        {/* Foto 4: Formato cuadrado */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704915/DSCN5896_ouhyaa.jpg"
                            alt="Edificio"
                            width={150}
                            height={150}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>

                        {/* Foto 5: Tamaño medio */}
                        <div className="col-span-1 row-span-2 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704917/DSCN5904_dsxbyl.jpg"
                            alt="Foto 5"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>

                        {/* Foto 6: Cuadrada */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704885/6_ct9pkb_a6zwan.jpg"
                            alt="Foto 6"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>

                        {/* Foto 7: Imagen pequeña con escala */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704883/5_kabdeo_u31roz.jpg"
                            alt="Foto 7"
                            width={120}
                            height={120}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        {/* Foto 2: Horizontal ancha para llenar espacios */}
                        <div className="col-span-2 sm:col-span-2 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704894/8_itrnty_csfjsu.jpg"
                            alt="Foto horizontal ancha"
                            width={300}
                            height={100}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            loading="eager"
                          />
                        </div>

                        {/* Foto 8: Vertical */}
                        <div className="hidden sm:block col-span-1 row-span-2 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704883/3_r0gpuq_tqky4z.jpg"
                            alt="Foto vertical"
                            width={120}
                            height={200}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            loading="lazy"
                          />
                        </div>

                        {/* Foto 10: Imagen pequeña */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704882/1_mz0g0y_rczged.jpg"
                            alt="Foto 10"
                            width={150}
                            height={150}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>
                        {/* Foto 10: Imagen pequeña */}
                        <div className="col-span-1 row-span-1 overflow-hidden rounded-lg">
                          <Image
                            src="https://res.cloudinary.com/dp5n0dmwe/image/upload/v1758704882/2_jb3la7_jxrzzv.jpg"
                            alt="Foto 10"
                            width={150}
                            height={150}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                            unoptimized
                          />
                        </div>
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
