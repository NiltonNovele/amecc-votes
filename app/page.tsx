"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votes, setVotes] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false); // <-- loading state

  useEffect(() => {
    let existingId = localStorage.getItem("userId");
    if (!existingId) {
      const newId = uuidv4();
      localStorage.setItem("userId", newId);
      setUserId(newId);
    } else {
      setUserId(existingId);
    }

    const storedVote = localStorage.getItem("hasVoted");
    if (storedVote === "true") setHasVoted(true);
  }, []);

  const handleVote = async () => {
    if (hasVoted || !userId || loading) return;

    setLoading(true); // start loading

    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          candidate: "Anderson Manjate",
          timestamp: new Date(),
        }),
      });

      localStorage.setItem("hasVoted", "true");
      setHasVoted(true);

      setTimeout(() => {
        router.push("/success");
      }, 500);
    } catch (error) {
      console.error("Erro ao enviar o voto:", error);
      alert("Ocorreu um erro ao enviar seu voto. Tente novamente.");
      setLoading(false); // reset loading on error
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f9ff] flex flex-col items-center font-sans p-6">
      <main className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-10 flex flex-col gap-10 border border-[#e5e9f4]">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Image 
            src="/logo-2.webp"
            width={70}
            height={70}
            alt="Logo AMECC"
          />
          <div>
            <h1 className="text-3xl font-bold text-[#1b1f3b]">
              Eleições AMECC
            </h1>
            <p className="text-[#687089] text-sm">
              Associação Moçambicana de Estudantes na Cidade do Cabo
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#eef4ff] border border-[#d5defc] text-[#1b2c58] rounded-lg p-5 text-sm leading-6">
          <strong>Como funcionam as eleições:</strong><br />
          • Cada estudante tem direito a <b>um único voto</b>.<br />
          • Após votar, já não poderá alterar a decisão.<br />
          • Os votos são contabilizados de forma segura e transparente.<br />
          • O processo garante que cada dispositivo só pode votar uma vez.
        </div>

        <h2 className="text-center text-xl font-semibold text-[#1b1f3b]">
          Existe apenas um candidato nesta eleição. Clique para saber mais:
        </h2>

        {/* Flippable Card */}
        <div 
          className="relative w-full max-w-sm mx-auto h-96 cursor-pointer perspective"
          onClick={() => setFlipped(!flipped)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-700 preserve-3d ${
              flipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT SIDE */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-xl shadow-md border border-[#e5e9f4] flex flex-col items-center justify-center gap-4 p-6">
              <Image
                src="/candidate.jpg"
                alt="Candidato"
                width={200}
                height={200}
                className="rounded-lg object-cover border border-[#d7dcef]"
              />
              <h2 className="text-2xl font-semibold text-[#1b1f3b]">
                Anderson Manjate
              </h2>
              <p className="text-[#687089] text-center text-sm">
                Clique no cartão para ver o manifesto
              </p>
            </div>

            {/* BACK SIDE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl shadow-md border border-[#e5e9f4] flex flex-col items-start p-6 gap-4">
              <h2 className="text-xl font-semibold text-[#1b1f3b]">
                Manifesto
              </h2>
              <p className="text-[#687089] text-sm leading-6">
                • Modernizar as infraestruturas tecnológicas.<br />
                • Criar workshops mensais de capacitação profissional.<br />
                • Estabelecer parcerias com empresas de tecnologia.<br />
                • Promover eventos de inovação e programação.<br />
                • Incentivar apoio académico entre os estudantes.
              </p>
              <p className="text-xs text-[#9aa2bd] mt-auto">
                Clique no cartão para voltar
              </p>
            </div>
          </div>
        </div>

        {/* Voting Section */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleVote}
            disabled={hasVoted || loading} // disable while loading
            className={`px-10 py-3 rounded-full text-white font-medium transition shadow-md ${
              hasVoted || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#3555f0] hover:bg-[#2a47cd]"
            }`}
          >
            {loading ? "Votando..." : hasVoted ? "Já votou" : "Votar"}
          </button>

          {/* <p className="text-lg font-medium text-[#1b1f3b]">
            Votos registados:{" "}
            <span className="font-bold text-[#3555f0]">{votes}</span>
          </p> */}
        </div>

      </main>

      {/* Modern Footer */}
      <footer className="w-full mt-12 py-6 bg-white border-t border-[#e5e9f4] flex flex-col md:flex-row justify-between items-center px-6 md:px-20 gap-2">
        <p className="text-sm text-[#687089] text-center md:text-left">
          © 2025 AMECC. Todos direitos reservados.
        </p>
        <p className="text-sm text-[#3555f0] text-center md:text-right hover:underline transition">
          Desenvolvido pela{" "}
          <a href="https://synctechx.com" target="_blank" rel="noopener noreferrer">
            SyncTechX
          </a>
        </p>
      </footer>

      {/* Extra CSS for 3D flip */}
      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
