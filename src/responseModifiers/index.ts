// modifiers for responses
// It is possible to add request date, logging, whatever you need in each request.
export const responseModifiers = {
    '/create': (data) => {
        const timeToAdd = 10*1000;

        return {
            ...data,
            createdAt: new Date(Date.now() + timeToAdd).toISOString()
        }
    }
}