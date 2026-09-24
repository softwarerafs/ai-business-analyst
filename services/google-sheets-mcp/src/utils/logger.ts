export interface LogEvent {
    event: string;
    requestId?: string;
    tool?: string;
    durationMs?: number;
    success?: boolean;
    errorType?: string;
}

export function logEvent(event: LogEvent): void {
    console.log(JSON.stringify({
        timestamp: new Date().toISOString(),
        ...event,
    }));
}
