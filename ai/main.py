from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, StreamingResponse
import httpx
import os
from dotenv import load_dotenv
from urllib.parse import urlencode

app = FastAPI(title="ImageFlow AI Service")

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
            return JSONResponse(
                {"status": "update", "message": "AI param will update soon"},
                status_code=403
            )

      
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