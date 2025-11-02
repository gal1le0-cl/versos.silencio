import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="nf-root" style={{position: 'relative'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

        @media (max-width: 600px) {
          .logo {
            width: 50px;
            height: 50px;
          }
          .mensaje {
            font-size: 1rem;
          }
          .nf-root {
            padding: 20px;
            height: 100dvh;
          }
        }

        .nf-root {
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          text-align: center;
        }

        .logo {
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
        }

        .mensaje {
          font-weight: 700;
          font-size: 1.2rem;
          color: #333;
        }

        .volver {
          display: inline-block;
          margin-top: 24px;
          padding: 10px 24px;
          background: #f5f5f5;
          color: #333;
          border-radius: 0;
          text-decoration: none;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
          transition: box-shadow 0.2s;
          box-shadow: 0 -4px 0 #333, 0 -4px 10px #bbb;
          border: 2px solid #333;
        }

        footer.nf-footer {
          position: absolute;
          bottom: 10px;
          width: 100%;
          text-align: center;
          font-size: 0.8rem;
          color: #888;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

  <Image src="/negativo-rbg.png" alt="Logotipo" width={80} height={80} className="logo" />
      <div className="mensaje">404 - Página no encontrada</div>
      <div style={{color: '#888', fontSize: '1rem', marginTop: 10}}>Lo sentimos! La página que buscas no esta <br></br> indexada o disponible en este momento</div>
  <Link href="/" className="volver">Volver al inicio</Link>

      <footer className="nf-footer">desarrollado por Adrian Sanchez</footer>
    </div>
  )
}
