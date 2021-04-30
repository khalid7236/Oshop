import { product } from 'src/app/DTO/product';
export class ShoppingCartItem {

    constructor(public product: product, public quantity: number) {
    }



    get totalPrice() {
        return this.product.price * this.quantity;
    }
}