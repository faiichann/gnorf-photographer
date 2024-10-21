import { useEffect, useState } from "react";

const Content = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const numberOfImages = 50; // Number of images to fetch

  const fetchDogImages = async () => {
    const imagePromises = Array.from({ length: numberOfImages }).map(() =>
      fetch("https://dog.ceo/api/breeds/image/random").then((res) => res.json())
    );

    const imageData = await Promise.all(imagePromises);
    const imageUrls = imageData.map((data) => data.message);
    setImages(shuffleArray(imageUrls));
    setLoading(false);
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchDogImages();
  }, []);

  if (loading) {
    return <div className="text-center">Loading images...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {images.map((image) => (
        <div className="overflow-hidden flex text-wrap p-4">
          <img
            src={image}
            alt="Dog"
            className="w-full max-h-[400px] object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default Content;
