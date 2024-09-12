import { ReactNode } from "react";

export interface ProductProps{
    image: string;
    productData:{
    brand:string;
    category:string;
    description:string;
    image:string;
    isNew:boolean;
    oldPrice:number;
    price:number;
    title:string;
    _id:number;
}[];
}
export interface StoreProduct{
    title:string;
    brand: ReactNode;
    _id:number;
    description:string;
    image:string;
    quantity:number;
    price:number;
    productData:{
    brand:string;
    category:string;
    isNew:boolean;
    oldPrice:number;
}[];
}
export interface StateProps{
    productData:ProductProps['productData'],
    favouriteData:[],
    userInfo:null|string;
    next:any;
}