package main.java;

import java.util.Date;

/**Class for storing information about an order */
public class Order {

    /**ID of the order */
    protected int id;

    /**Total price of the order */
    protected int totalPrice;

    /**Date the order was created */
    protected Date dateOrdered;

    /**Number of items in the order. */
    protected int numOfItems;
}
