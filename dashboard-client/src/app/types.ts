// Type definitions for Typescript

export interface Product {
    SKU: number;
    title: string;
    image: File | null;
}

export interface signupFormData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface loginFormData {
    email: string;
    password: string;
}
