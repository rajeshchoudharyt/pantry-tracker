export type Doc = {
    id: number;
    name: string;
    quantity: number;
    unit: string;
};

export type DocArray = Doc[];

export type DocObject = { [key: number]: Doc };
