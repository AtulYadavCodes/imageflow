import image from "../../assets/image.png";
import image2 from "../../assets/image2.png";
import { Typewriter } from "react-simple-typewriter";
import { useeffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

const images = [image, image2];
function HeroSection() {
  const [i, seti] = useState(1);
  return (
    <>
    <section
      id="home"
      className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8"
    >
      <div className="space-y-5">
        <span className="inline-flex border border-zinc-600 bg-zinc-900 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
          Built for fast media pipelines
        </span>

        <h1 className="font-mono text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
          Upload once. <br />
          Transform via URL. <br />
          Deliver instantly.
        </h1>

        <p className="max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
          A stream-based image pipeline where the URL becomes the API. 
          generates optimized images on demand by resizing, compressing, and converting a single original image into the best format for each user’s device. 
          No heavy processing layers.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="#image-tryout"
            className="rounded-md border border-zinc-500 bg-zinc-100 px-6 py-3 font-mono text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Try Playground
          </a>

          
        </div>

        <div className="flex flex-wrap gap-4 font-mono text-xs text-zinc-500">
          <span>Signed URL uploads</span>
          <span>Sharp stream pipeline</span>
          <span>URL-based transforms</span>
        </div>
      </div>

      <div>
        <div className="border-2 border-zinc-700 bg-zinc-900 p-4">
          <div className="mb-3 flex items-center justify-between border-b border-zinc-700 pb-2 font-mono text-xs uppercase tracking-[0.12em] text-zinc-400">
            <span>Preview Console</span>
            <span>LIVE</span>
          </div>

          <div className="overflow-hidden border border-zinc-700 bg-zinc-950">
            <img
              key={i}
              src={images[i]}
              alt="ImageFlow demo"
              className="w-full object-cover  "
            />
          </div>

          <div className="mt-3 border border-zinc-700 bg-zinc-950 p-3 font-mono text-xs text-white ">
            <Typewriter
              words={[
                `/images/path/avatar.jpg`,
                "/images/path/avatar.jpg?grayscale=true&blur=1",
              ]}
              loop={0}
              cursor
              cursorStyle="_"
              onDelay={() => (i === 0 ? seti(1) : seti(0))}
              delaySpeed={2500}
            />
          </div>
        </div>
      </div>
 
    </section>
     <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col items-start justify-between gap-4 border-2 border-zinc-700 bg-zinc-900 p-5 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">Are u a developer and want to use this service instead of Cloudinary or Imagekit </p>

        </div>

        <HashLink
          to="/apidocs/#"
          className="rounded-md border border-zinc-500 bg-zinc-100 px-3 py-2 font-mono text-xs font-semibold  tracking-[0.08em] text-zinc-900 transition hover:bg-zinc-200"
        >
          Check out API Docs
        </HashLink>
      </div></div>
    </>
  );
}

export default HeroSection;
