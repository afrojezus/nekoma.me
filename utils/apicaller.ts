
import { DEBUG } from "./";
/**
 * Simple fetch API wrapper which executes a typical fetch operation on a query.
 * @param query the url to fetch from, type of RequestInfo | URL
 * @param options fetch API options
 * @returns an object of type T
 */
export const apiCall = async <T, E>(query: RequestInfo | URL, options?: RequestInit | undefined) => {
    try {
        if (DEBUG) {
            console.log(`[API] Fetching from \"${query}\"`, options ? `using options: ${JSON.stringify(options)}` : undefined);
        }
        const response: Response = await fetch(query, options);
        if (response.status > 300) {
            const json = await response.json() as E;
            throw Error(`Failure, server responded with ${response.status}, retrieved json: ${JSON.stringify(json)}`);
        }
        if (DEBUG) {
            console.log(`[API] Status code ${response.status} retrieved from \"${query}\"`);
        }
        const json: T = await response.json() as T;
        if (DEBUG) {
            console.log(`[API] JSON retrieved from \"${query}\"`, json);
        }
        return json as T;
    } catch (error) {
        if (DEBUG) {
            console.error(`[API] Fetching failure! \"${query}\" responded with error: \"${error}\"`);
        }
        throw error;
    }
};