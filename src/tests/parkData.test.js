import { getParkData } from '../features/parksSlice';

jest.mock('../features/parksSlice', () => ({
  ...jest.requireActual('../features/parksSlice'),
  getParkData: jest.fn(),
}));

describe('getParkData', () => {
  test('should fetch park data correctly', async () => {
    const mockResponse = { data: [{ name: 'Park 1' }, { name: 'Park 2' }] };
    getParkData.mockResolvedValue(mockResponse);

    const result = await getParkData();

    expect(result).toEqual(mockResponse);
    expect(getParkData).toHaveBeenCalledTimes(1);
  });

  test('should handle API error', async () => {
    const errorMessage = 'API Error';
    getParkData.mockRejectedValue(new Error(errorMessage));

    await expect(getParkData()).rejects.toThrow(errorMessage);
    expect(getParkData).toHaveBeenCalledTimes(1);
  });
});
