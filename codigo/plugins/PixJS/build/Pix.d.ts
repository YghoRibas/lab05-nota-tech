export interface PixData {
    Key: string;
    Password: string;

    Sequence: string;
    Price: number;
    PixKey: string;

    AppKey?: string;

    Pfx?: string;
    PfxPassword?: string;
}

export enum PixImps {
    BancoDoBrasil = 1
}

export function Generate(PixImps, PixData): {
    image: Buffer;
    line: string;
};