import { register } from '../user';



describe('Register Function Tests', () => {
    describe('register function', () => {
        let fetchMock = jest.fn()

        beforeEach(() => {
            global.fetch = fetchMock
            fetchMock.mockClear();
        });

        afterEach(() => {
            fetchMock.mockRestore();
        });

        describe('GIVEN valid credentials', () => {
            describe('WHEN register is successful', () => {
                it('THEN should return a RegisterResponse with isSuccess true', async () => {
                    const credentials = { username: 'testuser', password: 'password123' };
                    fetchMock.mockResolvedValueOnce({
                        ok: true,
                        json: jest.fn().mockImplementation(() => ({ isSuccess: true }))
                    });

                    const result = await register(credentials);
                    expect(result).toEqual({ isSuccess: true });
                });
            });
        });

        describe('GIVEN invalid credentials or API error', () => {
            describe('WHEN register fails', () => {
                it('THEN should throw an error', async () => {
                    const credentials = { username: 'testuser', password: 'wrongpassword' };
                    fetchMock.mockResolvedValueOnce({
                        ok: false,
                        json: jest.fn()
                    });

                    await expect(register(credentials)).rejects.toThrow();
                });

            });
        });
    });
});