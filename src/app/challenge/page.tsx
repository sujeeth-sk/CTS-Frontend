'use client';
import React, { useState } from "react";
import Image from "next/image";

const EscapeSequence: React.FC = () => {
  const randomWords = ["apple", "banana", "cherry", "date"];
  const correctSequence = ["apple", "banana", "cherry", "date"];

  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSlotClick = (word: string) => {
    setSelectedWords(
      selectedWords.filter((selectedWord) => selectedWord !== word)
    );
  };

  const checkSequence = () => {
    if (selectedWords.length === 4) {
      const isSequenceCorrect = selectedWords.every(
        (word, index) => word === correctSequence[index]
      );
      if (isSequenceCorrect) {
        setIsCorrect(true);
      } else {
        alert("Try Again!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen">
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-50">
        <Image
          fill
          src="/images/handsBg.webp"
          alt="Background Image"
          className="object-cover w-full h-full"
          priority
          sizes="100vw" // Ensures image scales based on screen width
        />
      </div>
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-50 bg-black opacity-45"></div>

      {isCorrect ? (
        <div className="flex items-center justify-center w-full h-full transition-opacity duration-1000 opacity-100">
          <Image
            fill
            src="/images/letter.webp"
            alt="Success"
            className="w-[50%] h-[50%] object-cover fixed -z-30"
          />
          <p className="font-geistMonoVF tracking-wide text-4xl pb-28 max-sm:text-2xl max-sm:pb-20 text-white">
            You have<br />Escaped
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-around mb-8 sm:gap-6 ">
            {randomWords.map((word) => (
              <button
                key={word}
                onClick={() => handleWordClick(word)}
                className={`relative text-white sm:text-2xl px-4 py-2 m-2 rounded-lg transform transition-transform duration-300 font-geistMonoVF ${
                  selectedWords.includes(word)
                    ? "bg-gray-400 cursor-not-allowed scale-90"
                    : " hover:scale-105"
                }`}
                disabled={selectedWords.includes(word)}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="relative z-10">{word}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 sm:gap-12 max-sm:w-full sm:my-16 max-sm:my-8 px-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                onClick={() =>
                  selectedWords[idx] && handleSlotClick(selectedWords[idx])
                }
                className={`relative sm:text-3xl text-xl sm:w-32  h-12 rounded-lg flex items-center justify-center cursor-pointer transform transition-all duration-500 font-geistMonoVF ${
                  selectedWords[idx]
                    ? " text-[#dcd6b4] opacity-100 translate-y-0"
                    : "bg-gray-100 opacity-0"
                }`}
              >
                <span className="relative z-10">
                  {selectedWords[idx] ? selectedWords[idx] : "Slot"}
                </span>
              </div>
            ))}
          </div>

          <button
            className="mt-4 px-4 py-2 text-black font-geistMonoVF text-3xl relative tracking-wider"
            onClick={checkSequence}
            disabled={selectedWords.length !== 4}
          >
            Submit
            <Image
              fill
              src="/images/enter-paper.webp"
              alt="paper bg"
              className="absolute inset-0 h-full w-full -z-10"
            />
          </button>
        </>
      )}
    </div>
  );
};

export default EscapeSequence;
