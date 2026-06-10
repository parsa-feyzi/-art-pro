
import { ObjectIdQueryTypeCasting } from "mongoose";
import z from "zod";
import { signUpSchema } from "../features/auth/schemas/auth";
import { Dispatch, SetStateAction } from "react";

// types
export type DefaultDBInfos = {
  _id: ObjectIdQueryTypeCasting;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export type SignUpInfo = z.infer<typeof signUpSchema>;

export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export type SizeBase = "sm" | "lg" | "xl"

export type ButtonSizes = "default" | SizeBase | "icon" | "icon-sm" | "icon-lg" | null;

export type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;

export type ArticleStatus = "published" | "draft";

export type ServerAction = (formData: FormData) => Promise<any>

export type SetState<T> = Dispatch<SetStateAction<T>>

// interfaces
export interface User extends Pick<SignUpInfo, "userName" | "email"> {
    // Default DB Infos
    _id: number,
    _createdAt: Date,
    _updatedAt: Date,
    __v: number;
    //
    profileImage: string;
    articles: Omit<Article, "author">[]
}

export interface Article {
  // Default DB Infos
  _id: number,
  _createdAt: Date,
  _updatedAt: Date,
  __v: number;
  //
  title: string,
  authors: User[],
  category: string,
  content: string,
  status: ArticleStatus,
  views: number,
  featuredImage: string
}