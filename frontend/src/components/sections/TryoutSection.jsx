<div className="mt-2 p-3 rounded bg-blue-100/10 border border-blue-400 text-blue-300 text-xs font-mono">
  <strong>Note:</strong> Sometimes the preview cannot display all changes, especially if the <span className="font-semibold">height</span> or <span className="font-semibold">width</span> parameters are set to extreme values. The image is still processed, and you can use the link below to access the full result.
</div>


import { useState } from "react";

function TryoutSection({ KEY }) {
  const [form, setForm] = useState({
    preset: "",
    width: "",
    height: "",
    blur: "",
    rotate: "",
    fit: "",
    format: "",
    grayscale: false,
    removebg: false,
  });
  const [imgUrl, setImgUrl] = useState(KEY ? `https://imageflow.atulyadav.tech/images/path/${KEY}?` : `https://imageflow.atulyadav.tech/images/path/69ebc3079eb919b4e9e88516/1_TMAo0Qpl4j9TaE3sDyBTLg.jpg`);
  const [lastForm, setLastForm] = useState(form);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(imgUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      setCopied(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  // Helper to compare two form objects
  const isFormChanged = (a, b) => {
    return (
      a.preset !== b.preset ||
      a.width !== b.width ||
      a.height !== b.height ||
      a.blur !== b.blur ||
      a.rotate !== b.rotate ||
      a.fit !== b.fit ||
      a.format !== b.format ||
      a.grayscale !== b.grayscale ||
      a.removebg !== b.removebg
    );
  };

  // Only update image URL on submit if form changed
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormChanged(form, lastForm)) {
      // No change, do nothing
      return;
    }
    setLoading(true);
    const baseUrl = KEY
      ? `https://imageflow.atulyadav.tech/images/path/${KEY}?`
      : `https://imageflow.atulyadav.tech/images/path/69ebc3079eb919b4e9e88516/1_TMAo0Qpl4j9TaE3sDyBTLg.jpg?`;
    let url = baseUrl;
    // If preset is chosen, use only preset and ignore other fields
    if (form.preset) {
      url = `${baseUrl}&preset=${encodeURIComponent(form.preset)}`;
    } else {
      let query = "";
      if (form.width) query += `&width=${form.width}`;
      if (form.height) query += `&height=${form.height}`;
      if (form.blur) query += `&blur=${form.blur}`;
      if (form.rotate) query += `&rotate=${form.rotate}`;
      if (form.fit) query += `&fit=${form.fit}`;
      if (form.format) query += `&format=${form.format}`;
      if (form.grayscale) query += `&gray=true`;
      if (form.removebg) query += `&removebg=true`;
      if (query) url = `${baseUrl}${query}`;
    }
    setImgUrl(url);
    setLastForm({ ...form });
  };



  return (
    <section id="image-tryout" className="mx-auto w-full max-w-7xl max-h-4xl py-5 px-4  sm:px-6 lg:px-8 ">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Form */}
        <div className="min-w-0 h-contain border-2 border-zinc-700  p-6 flex flex-col gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">Image Tryout</p>
            <h2 className="mt-3 font-mono text-3xl font-semibold text-zinc-100">Transform playground</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-400">
              Enter transformation options and see the result instantly.
            </p>
            <div className="mt-3 p-3 rounded bg-yellow-100/10 border border-yellow-400 text-yellow-300 text-xs font-mono">
              <strong>Note:</strong> To try transformations on your own images, please log in and upload an image first.
            </div>
            <div className="mt-2 p-3 rounded bg-blue-100/10 border border-blue-400 text-blue-300 text-xs font-mono">
              <strong>Note:</strong> Sometimes the preview cannot display all changes, especially if the <span className="font-semibold">height</span> or <span className="font-semibold">width</span> parameters are set to extreme values. The image is still processed, and you can use the link below to access the full result.
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-2">
              <label className="text-xs text-zinc-400">Preset</label>
              <select name="preset" value={form.preset} onChange={handleChange} className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500">
                <option value="">(none)</option>
                <option value="thumbnail">thumbnail (300x300 webp)</option>
                <option value="profile">profile (400x400 webp)</option>
                <option value="banner">banner (1200x400 webp)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input disabled={!!form.preset} type="number" name="width" value={form.width} onChange={handleChange} placeholder="Width" className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500" />
              <input disabled={!!form.preset} type="number" name="height" value={form.height} onChange={handleChange} placeholder="Height" className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500" />
              <input type="number" name="blur" value={form.blur} onChange={handleChange} placeholder="Blur" className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500" />
              <input type="number" name="rotate" value={form.rotate} onChange={handleChange} placeholder="Rotate" className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500" />
              {(form.width && form.height) && (
                <select disabled={!!form.preset} name="fit" value={form.fit} onChange={handleChange} className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500">
                  <option value="">Fit (optional)</option>
                  <option value="cover">cover</option>
                  <option value="contain">contain</option>
                  <option value="fill">fill</option>
                  <option value="inside">inside</option>
                  <option value="outside">outside</option>
                </select>
              )}
              <select disabled={!!form.preset} name="format" value={form.format} onChange={handleChange} className="w-full border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500">
                <option value="">Format (optional)</option>
                <option value="jpeg">jpeg</option>
                <option value="png">png</option>
                <option value="webp">webp</option>
                <option value="tiff">tiff</option>
                <option value="avif">avif</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-zinc-200">
                <input  type="checkbox" name="grayscale" checked={form.grayscale} onChange={handleChange} />
                Black & White
              </label>
              <label className="flex items-center gap-2 text-zinc-200">
                <input  type="checkbox" name="removebg" checked={form.removebg} onChange={handleChange} />
                Remove BG
              </label>
            </div>
            <button type="submit" className="w-full rounded-md border border-zinc-500 bg-zinc-100 px-4 py-2 font-mono text-sm font-semibold text-zinc-900 hover:bg-zinc-200 transition">
              Apply
            </button>
            {loading && (
              <div className="mt-2 text-xs text-zinc-400 font-mono animate-pulse text-center">Processing image...</div>
            )}
          </form>
        </div>
        {/* Right: Image Preview */}
        <div className="min-w-0 border-2 border-zinc-700  p-6 flex flex-col items-center justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-500 mb-2">Preview</p>
          <div className="w-full flex items-center justify-center">
            <div className="w-[320px] h-80 sm:w-[384px] sm:h-96 flex items-center justify-center overflow-hidden rounded border border-zinc-800 bg-zinc-950">
              <img
                src={imgUrl}
                alt="Preview"
                className="object-contain w-full h-full"
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                style={{ position: 'relative', zIndex: 1 }}
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-6">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-400 mb-1 text-center">Image URL</p>
            <div className="break-all rounded bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs text-zinc-200 select-all text-center max-w-full flex items-center justify-between gap-2">
              <span className="truncate text-left w-full">...{imgUrl.slice(24)}</span>
              <button
                onClick={handleCopy}
                className="ml-2 px-2 py-1 rounded bg-zinc-800 border border-zinc-600 text-xs text-zinc-200 hover:bg-zinc-700 transition whitespace-nowrap"
                title="Copy URL"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TryoutSection
