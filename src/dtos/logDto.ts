export type LogDto = {
    path: string;
    time: string;
    method: string;
    status: number;
    body: Record<string, any>;
}