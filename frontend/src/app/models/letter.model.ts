export interface Letter {
  id: number;
  referenceNumber: string;
  subject: string;
  content?: string;
  sender: string;
  recipient: string;
  dateReceived: string;
  filePath?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: number;
}

export interface CreateLetterDto {
  referenceNumber: string;
  subject: string;
  content?: string;
  sender: string;
  recipient: string;
  dateReceived: string;
  file?: File;
}
