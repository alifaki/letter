export interface LetterTransaction {
  id: number;
  letterId: number;
  action: 'created' | 'updated' | 'forwarded' | 'closed';
  fromUserId?: number;
  toUserId?: number;
  comments?: string;
  createdAt: string;
}
