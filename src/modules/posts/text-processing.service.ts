import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TextProcessingService {
  API_URL =
    process.env.TEXT_PROCESSING_API_URL ||
    'https://text-processing.com/api/sentiment';

  async analyzeText(text: string): Promise<string> {
    try {
      const response = await axios.post(this.API_URL, { text });
      return response.data.label;
    } catch (err) {
      Logger.error('Error while processing text: ', err);
      Logger.error(err);
      throw new InternalServerErrorException('Error while processing text');
    }
  }
}
