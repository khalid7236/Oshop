import { product } from './../DTO/product';
import { ShoppingCartItem } from './Ishopping-cart-item';
export class ShoppingCart {

    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {

        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    getQuanity(product: product) {
        if (!product) return 0;

        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalQuantity() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].quantity;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}