import Image from 'next/image'

interface FeatureTileProps {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: 'top' | 'bottom';
}

export default function SideBySide() {
  const FeatureTile = ({ 
    subtitle, 
    title, 
    description, 
    image, 
    imagePosition = 'bottom'
  }: FeatureTileProps) => {
    const imageElement = (
      <div className={imagePosition === 'top' ? 'mb-8' : 'mt-auto pt-8'}>
        <Image 
          src={image}
          alt={title}
          width={800}
          height={600}
          className="w-full h-auto max-h-[300px] object-contain rounded-xl"
          priority
        />
      </div>
    );

    const contentElement = (
      <>
        <div className="text-violet-400 font-medium mb-4">{subtitle}</div>
        <h2 className="text-white text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>
      </>
    );

    return (
      <div className="bg-slate-900/60 rounded-3xl p-8 flex flex-col h-full backdrop-blur-sm">
        {imagePosition === 'top' ? (
          <>
            {imageElement}
            {contentElement}
          </>
        ) : (
          <>
            {contentElement}
            {imageElement}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto p-6">
      <FeatureTile
        subtitle="Organizacja wydarzenia"
        title="Twórz wyjątkowe wydarzenia"
        description="Stwórz spersonalizowane zaproszenie ze wszystkimi niezbędnymi szczegółami. Dodaj datę, lokalizację, opis i własną listę prezentów - wszystko w jednym miejscu, prosto i wygodnie."
        image="/images/homepage/event.png"
        imagePosition="bottom"
      />
      
      <FeatureTile
        subtitle="Proste udostępnianie"
        title="Błyskawiczne zapraszanie gości"
        description="Udostępnij swoje wydarzenie jednym kliknięciem. Wygeneruj unikalny kod QR lub krótki link i wyślij go swoim gościom. Bez skomplikowanych rejestracji - szybko i intuicyjnie."
        image="/images/homepage/qr.png"
        imagePosition="top"
      />
    </div>
  );
}