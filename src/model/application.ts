import { Note } from "./note.js";

export class Application {
    id: number;
    employer: string;
    title: string;
    link: string;
    companyId: number;
    notes?: Note[];
}
