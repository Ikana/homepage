import Link from "next/link";

const contentList = [
  "Iterative Pattern",
  "Face Generator",
  "Clock",
  "Generative landscape",
  "Virtual Creature",
  "Custom Pixel",
  "Drawing Machine",
  "Modular Alphabet",
  "Data Self Portraint",
  "Augmented Projections",
  "One-button Game"
];

export default function Home() {
  return (
    <div className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl leading-7">
        <p className="font-semibold leading-7">
          Welcome to Rodrigo Quezada&apos;s personal site
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Exploring Code as Creative Medium
        </h1>
        <p className="mt-6 text-xl leading-8">
          Journey into the exploration of the world of computational art and
          design. This site showcases the exercises done throughout the book -
          <Link
            href="https://mitpress.mit.edu/9780262542043/code-as-creative-medium/"
            className="underline"
          >
            {" "}
            Code as Creative Medium: A Handbook for Computational Art and Design{" "}
          </Link>
          .
        </p>
        <div className="mt-10">
          {contentList.map((content, index) => (
            <div
              className={`flex items-center text-xl leading-8 ${
                index % 2 === 0 ? "" : "justify-end"
              }`}
              key={index}
            >
              {index % 2 === 0 && (
                <span className="text-9xl mr-3">{index + 1}</span>
              )}
              <Link href={`/explore/${index + 1}`} className="underline">
                {content}
              </Link>
              {index % 2 !== 0 && (
                <span className="text-9xl ml-3">{index + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
