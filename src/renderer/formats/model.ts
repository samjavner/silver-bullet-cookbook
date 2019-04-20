export interface ImportRecipe {
    name: string;
    url: string;
    description: string;
    ingredients: string;
    directions: string;
    importWarnings: string[];
    extras: {
        // consumers should treat empty string the same as undefined
        [key: string]: string | string[] | undefined;
    };
}
