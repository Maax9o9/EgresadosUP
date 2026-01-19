interface GraduateCardProps {
  name: string;
  career: string;
  generation: string;
  image: string;
  synopsis: string;
  active?: boolean;
}

const GraduateCard: React.FC<GraduateCardProps> = ({
  name,
  career,
  generation,
  image,
  synopsis,
  active = false,
}) => {
  return (
    <div
      className={`
        rounded-xl w-[320px] sm:w-[420px] md:w-[480px]
        p-[3px] bg-gradient-to-b from-[#8DD2FF] via-[#0A83C8] to-[#137AB5]
      `}
    >
      <div className="bg-white rounded-xl p-6 w-full">
        <div className="flex flex-col items-center text-center">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover mb-4"
          />
          <h2 className="text-lg md:text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-base md:text-lg font-bold text-[#0A83C8]">{career}</p>
          <p className="text-lg md:text-xl font-bold text-gray-800 mt-1">
            {generation}
          </p>
          <textarea
            value={synopsis}
            readOnly
            className="mt-4 w-full p-3 rounded-lg border border-gray-300 text-sm text-gray-700 font-semibold resize-none focus:outline-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
};
export default GraduateCard;