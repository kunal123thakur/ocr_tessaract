import os
from dotenv import load_dotenv
import easyocr
import pytesseract
from pdf2image import convert_from_path
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from pydantic.v1 import BaseModel, Field
from .models import DocumentData

load_dotenv()

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

# Initialize ChatGroq
llm = ChatGroq(
    temperature=0,
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

class StructuredOutput(BaseModel):
    roll_no: str = Field(..., description="The roll number of the candidate")
    candidate_name: str = Field(..., description="The name of the candidate")
    mother_name: str = Field(..., description="The name of the candidate's mother")
    father_name: str = Field(..., description="The name of the candidate's father")
    date_of_birth: str = Field(..., description="The date of birth of the candidate")
    school_name: str = Field(..., description="The name of the school")
    result: str = Field(..., description="The result of the exam")

def process_image(file_path: str) -> str:
    """
    Extracts text from an image using EasyOCR.
    """
    result = reader.readtext(file_path)
    text = " ".join([item[1] for item in result])
    return text

def process_pdf(file_path: str) -> str:
    """
    Extracts text from a PDF using Tesseract OCR.
    """
    images = convert_from_path(file_path)
    text = ""
    for image in images:
        text += pytesseract.image_to_string(image)
    return text

def get_structured_data(file_name: str, text: str) -> DocumentData:
    """
    Uses ChatGroq to extract structured data from text.
    """
    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are an expert at extracting information from documents."),
            ("human", "Extract the following information from the text below:\n\n{text}"),
        ]
    )

    structured_llm = llm.with_structured_output(StructuredOutput)
    chain = prompt | structured_llm
    response = chain.invoke({"text": text})

    return DocumentData(
        file_name=file_name,
        content=text,
        roll_no=response.roll_no,
        candidate_name=response.candidate_name,
        mother_name=response.mother_name,
        father_name=response.father_name,
        date_of_birth=response.date_of_birth,
        school_name=response.school_name,
        result=response.result,
    )
