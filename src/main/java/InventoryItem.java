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
    
    /**price of the item*/
    protected double price;

    /**
     * Create a new Inventory Item
     * @param id
     * @param size
     * @param color
     * @param option
     * @param quantity
     * @param price
     */
    public InventoryItem(int id, int size, int color, int option, int quantity, double price) {
        this.id = id;
        this.size = size;
        this.color = color;
        this.option = option; 
        this.quantity = quantity;
    }

    /**
     * Restocks the item
     * @param quantityAdded How many items were gained from the restock
     */
    public void Restock(int quantityAdded) {
        //todo: implement
    }

    /**
     * 
     * @param quantityRemoved How many items taken off of the inventory
     */
    public void pullInventory(int quantityRemoved){

    }

    /**
     * Returns if the inventory of the item is below the low inventory threshhold or not
     * @return if the item has low inventory
     */
    public boolean isLowInventory(){
        
    }

}
