from pydantic import BaseModel
from typing import Optional

class DocumentData(BaseModel):
    file_name: str
    content: str
    roll_no: Optional[str] = None
    candidate_name: Optional[str] = None
    mother_name: Optional[str] = None
    father_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    school_name: Optional[str] = None
    result: Optional[str] = None

class ChatRequest(BaseModel):
    text: str
