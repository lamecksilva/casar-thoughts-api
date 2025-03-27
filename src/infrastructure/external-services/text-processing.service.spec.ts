import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { TextProcessingService } from '../../infrastructure/external-services/text-processing.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TextProcessingService', () => {
  let textProcessingService: TextProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextProcessingService],
    }).compile();

    textProcessingService = module.get<TextProcessingService>(
      TextProcessingService,
    );
  });

  it('should be defined', () => {
    expect(textProcessingService).toBeDefined();
  });

  it('should return sentiment label when API call is successful', async () => {
    const text = 'I like weddings';
    const mockResponse = {
      data: { label: 'positive' },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await textProcessingService.analyzeText(text);

    expect(result).toBe('positive');
    expect(axios.post).toHaveBeenCalledWith(textProcessingService.API_URL, {
      text,
    });
  });

  it('should throw an error when API call fails', async () => {
    const text = 'I like weddings';
    mockedAxios.post.mockRejectedValue(new Error('API error'));

    await expect(textProcessingService.analyzeText(text)).rejects.toThrow(
      new InternalServerErrorException('Error while processing text'),
    );
    expect(axios.post).toHaveBeenCalledWith(textProcessingService.API_URL, {
      text,
    });
  });
});
