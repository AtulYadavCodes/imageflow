import ApiKeySection from "./ApiKeySection";
import ArchitectureSection from "./ArchitectureSection";

const docs = [
  // FILE UPLOAD FLOW
  {
    title: " UPLOAD FILE USING SDK (BROWSER)",
    usageExample: `import { imageflowuploadfunction } from "./imageflowuploadfunction.js";\n\n const file = document.querySelector("#file-input").files[0];\n const apiKey = "sk_xxxxxxxxxx";\n const result = await imageflowuploadfunction(file, apiKey, "documents");\n console.log(result);`,
    detail:
      "Client-side file upload using our JavaScript SDK. Handles signed URL retrieval and direct S3 upload seamlessly.",
    note: "If you wish to have more control, you can use the internal endpoints that the SDK uses under the hood. To know more, visit the GitHub README.",
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": { \n  filename=""\n  filekey=""\n  folder=""\n  filesize=""\n  folder=""\n  filelink=""\n }\n}`,
    errorexample: `{\n"statusCode": 400,\n "message": "Bad Request - Invalid file type",\n "error":[...] \n }`,
    link: "https://github.com/AtulYadavCodes/imageflowsdk",
  },
  {
    title: " UPLOAD FILE USING SDK (BACKEND)",
    usageExample: ` import { imageflowuploadfunction } from "./imageflowuploadfunction.js";\n\nconst apiKey = "sk_xxxxxxxxxx";\nconst result = await imageflowuploadfunction("./pics/a.jpg", apiKey, "reports");\nconsole.log(result);`,
    detail:
      "Server-side file upload using our JavaScript SDK. Ideal for Node.js environments, it abstracts away the complexities of signed URL handling and S3 interactions.",
    note: "If you wish to have more control, you can use the internal endpoints that the SDK uses under the hood. To know more, visit the GitHub README.",
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": { \n  filename=""\n  filekey=""\n  folder=""\n  filesize=""\n  folder=""\n  filelink=""\n }\n}`,
    errorexample: `{\n "statusCode": 400,\n "message": "Bad Request - Invalid file type",\n "error":[...] \n }`,
    link: "https://github.com/AtulYadavCodes/imageflowsdk",
  },
  // FILES
  {
    title: "Get All Files",
    usageExample: `// Using axios\naxios.get(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfiles?page=2&limit=20&sortby=createdAT&sorttype=desc\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));`,
    detail: "Paginated fetch of user files with sorting support.",
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": [{ ... }{....}]\n }`,
    errorexample: `{\n "statusCode": 401,\n "message": "Unauthorized - Invalid API key",\n "error":[...]\n }`,
  },

  // FOLDERS
  {
    title: "List Folders",
    usageExample: `// Using axios\naxios.get(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));                                               `,
    detail: "Retrieve all folders for current user.",
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": [{ ... }{...}]\n }`,
    errorexample: `{\n "statusCode": 401,\n "message": "Unauthorized - Invalid API key",\n "error":[...]\n }`,
  },
  {
    title: "Files in Folder",
    usageExample: `// Using axios\naxios.get(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getallfilesinfolder/:foldername\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch(\`${import.meta.env.VITE_API_BASE}/api/v1/folders/getalluserfolders\`, {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));`,
    detail: "Get all files belonging to a specific folder.",
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": [{ ... }{...}]\n }`,
    errorexample: `{\n "statusCode": 404,\n "message": "Folder not found",\n "error":[...]\n }`,
  },

  // TRANSFORM
  {
    title: "Image Transform",
    usageExample: `// Using axios\naxios.get(\`${import.meta.env.VITE_API_BASE}/images/path/key?height=100&width=100&fit=cover\`\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch(\`${import.meta.env.VITE_API_BASE}/images/path/key?removebg=true&grayscale=true\`)\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err)); \n \n//inside image tag \n\nsrc would be ${import.meta.env.VITE_API_BASE}/images/path/key?query `,
    detail:
      "Stream-based image transformation. Supports width, height, fit, format, blur, grayscale, rotate, removebg via query params.",
    note: "This is the core of ImageFlow. All transformations happen here via URL query parameters.",
    responseexample: `Returns the transformed image stream directly in the response.`,
    errorexample: `{\n "statusCode": 400,\n "message": "Bad Request - Invalid transformation parameter",\n "error":[...]\n }`,
  },
];

function ApiDocsSection() {
  return (
    <>
      <ApiKeySection />



      <ArchitectureSection />
      <section
        id="api-docs"
        className="mx-auto w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12"
      >
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-zinc-400">
              API Docs
            </p>
            <h2 className="mt-2 font-mono text-2xl sm:text-3xl font-semibold text-zinc-100">
              Core endpoints
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {docs.map((item) => (
            <article
              key={item.title}
              className="border-2 border-zinc-700  p-3 sm:p-5 rounded-lg w-full overflow-hidden"
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-400 break-words">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.detail}
              </p>
              {/* {item.note ? (
              <p className="mt-3 my-1 border border-amber-300/40 bg-amber-200/10 px-3 py-2 text-xs leading-5 text-amber-200">
                Note: {item.note}
              </p>
            ) : null} */}

              <div className=" my-1 p-2 sm:p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto rounded">
                <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Usage Example
                </p>
                <pre className="text-zinc-100 whitespace-pre-wrap break-words">{item.usageExample}</pre>
              </div>

              <p className="text-zinc-400">sample success response</p>
              <div
                id="success response"
                className=" my-1 p-2 sm:p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto rounded"
              >
                <pre className="text-emerald-400/90 whitespace-pre-wrap break-words">{item.responseexample}</pre>
              </div>

              <p className="text-zinc-400">sample error response</p>
              <div className=" my-1 mb-3 p-2 sm:p-4 border border-zinc-800 font-mono text-[13px] overflow-x-auto rounded">
                <pre className="text-rose-400/90 whitespace-pre-wrap break-words">{item.errorexample}</pre>
              </div>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  className="text-black  bg-zinc-300 p-2 rounded-md hover:text-xl"
                >
                  Sdk download
                </a>
              ) : null}
            </article>
          ))}

          <div className="mt-3 flex gap-2">
            <a
              href="#api-docs"
              className="font-mono text-sm font-medium text-zinc-400 hover:text-zinc-200"
            >
              Back to top
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default ApiDocsSection;
