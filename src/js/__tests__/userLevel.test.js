import { getLevel } from '../userLevel';
import {fetchData} from '../http';

jest.mock('../http');

describe('getLevel', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return level when response is ok', () => {
        fetchData.mockReturnValue({ status: 'ok', level: 5 });
        const result = getLevel(1);
        expect(result).toBe('Ваш текущий уровень: 5');
    });

    test('should return error message when response is not ok', () => {
        fetchData.mockReturnValue({ status: 'error' });
        const result = getLevel(1);
        expect(result).toBe('Информация об уровне временно недоступна');
    });

    test('should return error message when fetchData throws an error', () => {
        fetchData.mockImplementation(() => {
            throw new Error('Network error');
        });
        const result = getLevel(1);
        expect(result).toBe('Информация об уровне временно недоступна');
    });
});
