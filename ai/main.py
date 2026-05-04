from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
import httpx
import os
from dotenv import load_dotenv
from urllib.parse import urlencode
from openai import OpenAI
import json

app = FastAPI(title="ImageFlow AI Service")

def get_openrouter_client() -> OpenAI:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not set")

    return OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
    )


def build_ai_response(prompt: str):
    client = get_openrouter_client()
    site_url = os.getenv("OPENROUTER_SITE_URL", "")
    site_name = os.getenv("OPENROUTER_SITE_NAME", "ImageFlow")

    completion = client.chat.completions.create(
        extra_headers={
            "HTTP-Referer": site_url,
            "X-OpenRouter-Title": site_name,
        },
        model="poolside/laguna-m.1:free",
       messages=[
    {
        "role": "system",
        "content": """
You are an intelligent media transformation parser for an image processing pipeline.

Your job is to:
1. Understand the user's natural language request.
2. Convert it into a structured transformation query.

You MUST extract and infer the following parameters if present:
- width
- height
- fit (cover, contain, fill, inside, outside, etc.)
- format (jpg, png, webp, avif)
- grayscale (gray=true/false)
- background removal (bgremove=true/false)
- preset (thumbnail, avatar, banner, etc.)

Rules:
- Output ONLY a query string (NO explanation, NO JSON, NO markdown).
- Format must be URL query style:
    width=...&height=...&fit=...&format=...&gray=...&bgremove=...&preset=...
- if a parameter is not mentioned in the user query, its value should not be included in the output (e.g. if fit is not mentioned, do NOT include fit= in the output).
- if preset is mentioned, it should be included as preset=thumbnail (or avatar, banner, etc.) and then height, width, fit can be left empty to allow preset defaults to take effect.
- If a value is not present in user query, intelligently infer defaults:
  - fit=cover
  - format=webp
  - gray=false
  - bgremove=false
- Use only lowercase keys and values.
- Do NOT include spaces.
- Do NOT include unknown parameters.
- if the user query is ambiguous, make the best guess based on common image processing needs.

Examples:

User: "make this image 300x300 thumbnail and remove background"
Output:
width=300&height=300&fit=cover&format=webp&gray=false&bgremove=true&preset=thumbnail

User: "convert to grayscale and compress as png"
Output:
width=&height=&fit=cover&format=png&gray=true&bgremove=false

User: "resize to 800 width keep aspect ratio"
Output:
width=800&height=&fit=contain&format=webp&gray=false&bgremove=false


Strictly follow output format.
"""
    },
    {
        "role": "user",
        "content": prompt,
    }
]
    )

    return completion.choices[0].message.content.strip()
































# Load env
load_dotenv()
DOMAIN = os.getenv("DOMAIN")

if not DOMAIN:
    raise RuntimeError("DOMAIN is not set")


BASE_URL = DOMAIN


@app.get("/images/path/{key:path}")
async def handle_image_request(key: str, request: Request):
    try:
 
        target_url = f"https://{BASE_URL}/nodeimages/path/{key}"

       
        query_params = dict(request.query_params)

        

        
        if "ai" in query_params:
            prompt = query_params.get("ai") or "What is the meaning of life?"
            target_url += "?" + build_ai_response(prompt)
      
        if query_params:
            target_url += "?" + urlencode(query_params)

        print("FINAL URL:", target_url)

       
        headers = {
            "User-Agent": request.headers.get("user-agent", "Mozilla/5.0"),
            "Accept": request.headers.get("accept", "*/*"),
        }

       
        if "range" in request.headers:
            headers["Range"] = request.headers["range"]

       
        async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
            response = await client.get(target_url, headers=headers)

        print("UPSTREAM STATUS:", response.status_code)

       
        if response.status_code >= 400:
            return JSONResponse(
                {
                    "status": "error",
                    "code": response.status_code,
                    "message": response.text
                },
                status_code=response.status_code
            )



        return StreamingResponse(
            response.aiter_bytes(),
            status_code=response.status_code,
            headers={
                "Content-Type": response.headers.get("content-type", "image/*"),
                "Cache-Control": response.headers.get("cache-control", ""),
                "ETag": response.headers.get("etag", ""),
            }
        )
        

    except Exception as e:
       
       

        return JSONResponse(
            {"status": "error", "message": str(e)},
            status_code=500
        )




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",  
        port=8000,
        reload=True
    )