package main.java;

/**Class for storing information about itens in an order */
public class OrderItem {

    /**Number of items */
    protected int quantity;

    /**Price the items were purchased for. */
    protected int purchasePrice;

    public OrderItem(int quantity, int purchasePrice){
        this.quantity = quantity;
        this.purchasePrice = purchasePrice;
    }
}
