import { QuestionData } from './QuestionData.interface';

export interface QuestionsResponse {
  response_code: number;
  results: QuestionData[];
}
