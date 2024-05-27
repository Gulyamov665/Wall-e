from pydantic import BaseModel
from typing import List, Dict, Optional


class ExecutorProfile(BaseModel):
    user: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    chat_id: Optional[int] = None
    avatar: Optional[str] = None


class ObserverProfile(BaseModel):
    user: int
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    chat_id: Optional[int] = None
    avatar: Optional[str] = None


class MessageRequest(BaseModel):
    id: int
    created_at: Optional[str] = None
    name: Optional[str] = None
    start_time: Optional[str] = None
    dead_line: Optional[str] = None
    status: Optional[str] = None
    executor: Optional[int] = None
    observers: Optional[List[int]] = None
    comments: Optional[str] = None
    priority: Optional[str] = None
    classification: Optional[int] = None
    classification_name: Optional[str] = None
    task_images: Optional[List[str]] = None
    executor_profile: ExecutorProfile
    observers_profile: Optional[List[ObserverProfile]] = None
    task_comment: Optional[List[Dict]] = None
