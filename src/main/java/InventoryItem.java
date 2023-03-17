package main.java;
public class InventoryItem {

    /**ID of the inventory item. */
    protected int id;

    /**size code of the inventory item */
    protected int size;

    /**color code of the inventory item */
    protected int color;

    /**option code of the inventory item */
    protected int option;

    /**number of the inventory item in stock */
    protected int quantity;

    /**
     * Create a new Inventory Item
     * @param id
     * @param size
     * @param color
     * @param option
     * @param quantity
     */
    public InventoryItem(int id, int size, int color, int option, int quantity) {
        this.id = id;
        this.size = size;
        this.color = color;
        this.option = option; 
        this.quantity = quantity;
    }

    /**Restock the item */
    public void Restock() {
        //todo: implement
    }
}
