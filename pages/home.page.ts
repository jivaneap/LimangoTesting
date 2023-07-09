
export class HomePage {
    public page: any;
    public searchFieldButton: any;
    public addToCartButton: any;
    public deleteFromCartButton: any;
    public deleteFromCartAcceptButton: any;
    public emptyCartTxt: any;

    constructor(page: any) {

        this.page = page;
        this.searchFieldButton = page.getByPlaceholder('Czego szukasz?');
        this.addToCartButton = page.locator('//button[@data-testid="add-to-cart"]');
        this.deleteFromCartButton = page.locator('//button[@class="jss217 jss259 _1g1Wa gtm_cart_delete_product"]');
        this.deleteFromCartAcceptButton = page.locator('//button[@class="jss217 jss273 jss284 jss287 gtm_cart_remove_product_accept jss395"]');
        this.emptyCartTxt = page.getByText('Twój koszyk jest pusty');

    }

    async searchProduct(product_name: String) {
        await this.searchFieldButton.fill(product_name);
        await this.searchFieldButton.press('Enter');
    }

    async addToCart(item_name: String) {
        await this.page.getByRole('button', { name: `${item_name}` }).click();
        await this.addToCartButton.click();
    }

    async deleteFromCart() {
        await this.deleteFromCartButton.click();
        await this.deleteFromCartAcceptButton.click();
    }

}