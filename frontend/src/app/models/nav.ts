export class NavRequest {
    constructor (
        public add:boolean,
        public entry:NavEntry
    ){}
}

export class NavEntry {
    title:string;
    dest:string[];
}
