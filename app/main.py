from fastapi import FastAPI, Request, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from app.services import process_image, process_pdf, get_structured_data
from app.utils import save_upload_file
from app.models import DocumentData, ChatRequest
import os
import uvicorn
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Get the absolute path to the current file's directory
current_dir = os.path.dirname(os.path.abspath(__file__))

app.mount("/static", StaticFiles(directory=os.path.join(current_dir, "static")), name="static")

templates = Jinja2Templates(directory=os.path.join(current_dir, "templates"))

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/upload/", response_model=DocumentData)
async def upload_file(file: UploadFile = File(...)):
    file_path = save_upload_file(file)
    file_extension = file.filename.split(".")[-1].lower()

    if file_extension in ["png", "jpg", "jpeg"]:
        text = process_image(file_path)
    elif file_extension == "pdf":
        text = process_pdf(file_path)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    structured_data = get_structured_data(file.filename, text)
    return structured_data

@app.post("/chatbot/")
async def chatbot(chat_request: ChatRequest):
    if not chat_request.text:
        raise HTTPException(status_code=400, detail="Text is required")

    llm = ChatGroq(
        temperature=0.7,
        model="llama-3.1-70b-versatile",
        api_key=os.getenv("GROQ_API_KEY")
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are a helpful assistant."),
            ("human", "{text}"),
        ]
    )

    chain = prompt | llm
    response = chain.invoke({"text": chat_request.text})
    return {"response": response.content}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
