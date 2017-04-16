import { Language } from '../models/language';

export class Translation {
    id: number;
    poem_id: number;
    language: Language;
    content: string;
    translated_title: string;
    translated_collection: string;
}
