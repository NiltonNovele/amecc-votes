export default function Success() {
  return (
    <div className="min-h-screen bg-[#f6f9ff] flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-md p-10 rounded-xl shadow-lg border border-[#e5e9f4] text-center flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-[#1b1f3b]">
          Voto Confirmado!
        </h1>
        <p className="text-[#687089]">
          O seu voto foi registado com sucesso.<br />
          Obrigado por participar nas eleições da AMECC.
        </p>
      </div>
    </div>
  );
}
