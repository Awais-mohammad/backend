export class CreateProductDto {
    name: string;
    bannerImageURL: string;
    prodImageURLS: string[]
    category: string;
    quantity: number;
    price: number;
    color: string[];
    reviews: { date: string; review: string, username: string, userImageURL: string, userID: string }[];


}
