package main.java;

/**Class for storing information about a product */
public class Product {

    /**ID of the product */
    protected int productID;

    /**Name of the product */
    protected String name;

    /**Description of the product */
    protected String description;

    /**
     * Create a new product
     * @param id
     * @param name
     * @param description
     */
    public Product(int id, String name, String description) {
        this.productID = id;
        this.name = name;
        this.description = description;
    }
}
