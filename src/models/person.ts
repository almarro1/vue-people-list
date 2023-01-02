export interface Person {
    name: string,
    surname: string,
    email: string,
}

export interface IndexablePerson extends Person {
    id: number,
}

export type People = Array<IndexablePerson>;
