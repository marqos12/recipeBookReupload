export interface Recipe{
    id:number;
    image:string;
    name:string;
    shortdesc:string;
    longdesc:string;
    mark:number;
    favourite:boolean;
    ingredients:Ingredient[];
    steps:Step[];
}

export interface Ingredient{
    id:number;
    idRecipe:number;
    amount:number;
    name:string;
    unit:string;
    image:string;
}

export interface Step{
    id:number;
    idRecipe:number;
    sequence:number;
    description:string;
}

export interface Opinion{
    id:number;
    idRecipe:string;
    text:string;
    mark:number;
    author:string;
}