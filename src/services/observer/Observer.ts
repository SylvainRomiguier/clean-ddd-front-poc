export type Listener<EventType> = (event: EventType) => void;

export function createObserver<EventType>(): {
    subscribe: (listener: Listener<EventType>) => () => void;
    publish: (event: EventType) => void;
} {
    let listeners: Listener<EventType>[] = [];
    return {
        subscribe: (listener: Listener<EventType>): (() => void) => {
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((l) => l !== listener);
            };
        },
        publish: (event: EventType) => {
            listeners.forEach((listener) => listener(event));
        },
    };
}
