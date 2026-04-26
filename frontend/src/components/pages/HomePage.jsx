

import ApiDocsSection from '../sections/ApiDocsSection';
import ApiKeySection from '../sections/ApiKeySection';
import FooterSection from '../sections/FooterSection';
import HeroSection from '../sections/HeroSection';
import TryoutSection from '../sections/TryoutSection';


const apiDocs = [

 
 
  // FILE UPLOAD FLOW 
  {
       title: ' UPLOAD FILE USING SDK (BROWSER)',
    usageExample: `import { imageflowuploadfunction } from "./imageflowuploadfunction.js";\n\n const file = document.querySelector("#file-input").files[0];\n const apiKey = "sk_xxxxxxxxxx";\n const result = await imageflowuploadfunction(file, apiKey, "documents");\n console.log(result);`,
    detail: 'Client-side file upload using our JavaScript SDK. Handles signed URL retrieval and direct S3 upload seamlessly.',
    note: 'If you wish to have more control, you can use the internal endpoints that the SDK uses under the hood. To know more, visit the GitHub README.',
    responseexample: `{"statusCode": 200,\n "message": "Operation successful",\n "data": { ... }\n }`,
    errorexample: `{"statusCode": 400,\n "message": "Bad Request - Invalid file type",\n "error":[...] \n }`,
    link:"https://github.com/AtulYadavCodes/imageflowsdk"
  },
  {
     title: ' UPLOAD FILE USING SDK (BACKEND)',
    usageExample: ` import { imageflowuploadfunction } from "./imageflowuploadfunction.js";\n\nconst apiKey = "sk_xxxxxxxxxx";\nconst result = await imageflowuploadfunction("./pics/a.jpg", apiKey, "reports");\nconsole.log(result);`,
    detail: 'Server-side file upload using our JavaScript SDK. Ideal for Node.js environments, it abstracts away the complexities of signed URL handling and S3 interactions.',
    note: 'If you wish to have more control, you can use the internal endpoints that the SDK uses under the hood. To know more, visit the GitHub README.',
    responseexample: `{"statusCode": 200,\n "message": "Operation successful",\n "data": { ... }\n }`,
    errorexample: `{"statusCode": 400,\n "message": "Bad Request - Invalid file type",\n "error":[...] \n }`,
    link:"https://github.com/AtulYadavCodes/imageflowsdk"
  },
  // FILES
  {
    title: 'Get All Files',
    usageExample: `// Using axios\naxios.get('http://localhost:3000/api/v1/folders/getalluserfiles?page=2&limit=20&sortby=createdAT&sorttype=desc', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch('http://localhost:3000/api/v1/folders/getalluserfolders', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));`,
    detail: 'Paginated fetch of user files with sorting support.',
    responseexample:  `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": { ... }\n }`,
    errorexample: `{\n "statusCode": 401,\n "message": "Unauthorized - Invalid API key",\n "error":[...]\n }`
  },

  // FOLDERS
  {
    title: 'List Folders',
    usageExample: `// Using axios\naxios.get('http://localhost:3000/api/v1/folders/getalluserfolders', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch('http://localhost:3000/api/v1/folders/getalluserfolders', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));                                               `,
    detail: 'Retrieve all folders for current user.',
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": { ... }\n }`,
      errorexample: `{\n "statusCode": 401,\n "message": "Unauthorized - Invalid API key",\n "error":[...]\n }`
  },
  {
    title: 'Files in Folder',
    usageExample: `// Using axios\naxios.get('http://localhost:3000/api/v1/folders/getallfilesinfolder/:foldername', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch('http://localhost:3000/api/v1/folders/getalluserfolders', {\n  headers: {\n    Authorization: 'Bearer <YOUR_API_KEY>'\n  }\n})\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err));`,
    detail: 'Get all files belonging to a specific folder.',
    responseexample: `{\n "statusCode": 200,\n "message": "Operation successful",\n "data": { ... }\n }`,
    errorexample: `{\n "statusCode": 404,\n "message": "Folder not found",\n "error":[...]\n }`
  },


  // TRANSFORM
  {
    title: 'Image Transform',
    usageExample: `// Using axios\naxios.get('http://localhost:3000/images/path/key?height=100&width=100&fit=cover'\n.then(res => console.log(res.data))\n.catch(err => console.error(err));\n\n// Using fetch\nfetch('http://localhost:3000/images/path/key?removebg=true&grayscale=true')\n.then(res => res.json())\n.then(data => console.log(data))\n.catch(err => console.error(err)); \n \n//inside image tag \n\nsrc would be http://localhost:3000/images/path/key?query ` ,
    detail:
      'Stream-based image transformation. Supports width, height, fit, format, blur, grayscale, rotate, removebg via query params.',
    note: 'This is the core of ImageFlow. All transformations happen here via URL query parameters.',
    responseexample: `Returns the transformed image stream directly in the response.`,
    errorexample: `{\n "statusCode": 400,\n "message": "Bad Request - Invalid transformation parameter",\n "error":[...]\n }`
  },
  
];
function HomePage() {
  return (
    <>
      <HeroSection />
      <ApiDocsSection docs={apiDocs} />
      <ApiKeySection />
      <TryoutSection steps={[
        'Pick an image file from your device.',
        'Send it through the upload flow with your API key.',
        'Use the returned file link to preview or transform the asset.',
      ]} />
      <FooterSection />
    </>
  );
}

export default HomePage;