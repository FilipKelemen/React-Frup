export const throttle =<T extends (...args: any) => any>(callback: T, limit: number) => {
    let wait = false;                  // Initially, we're not waiting
    return (...args: Parameters<T>) => {               // We return a throttled function
        if (!wait) {                   // If we're not waiting
            callback(...args);           // Execute users function
            wait = true;               // Prevent future invocations
            setTimeout(() => {   // After a period of time
                wait = false;          // And allow future invocations
            }, limit);
        }
    }
}