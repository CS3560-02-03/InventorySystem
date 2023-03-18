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

    /**
     * @return Description of product
     */
    public String getDescription(){
        return description;
    }

    /**
     * @return Name of product
     */
    public String getName(){
        return name;
    }

    /**
     * @param description Description of product you want to set
     */
    public void setDescription(String description){
        this.description = description;
    }

    /**
     * @param name Name of product you want to set
     */
    public void setName(String name){
        this.name = name;
    }
}
