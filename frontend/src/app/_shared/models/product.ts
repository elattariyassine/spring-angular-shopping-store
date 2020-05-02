export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    created_at: Date;
    updated_at: Date;
}
