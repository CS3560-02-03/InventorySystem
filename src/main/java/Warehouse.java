package main.java;

/**Class for storing information about different warehouses */
public class Warehouse {

    /**Name of the warehouse */
    protected String name;

    /**Address of the warehouse */
    protected Address address;

    /**Phone number of the warehouse */
    protected String phoneNumber;

    /**Email address of the warehouse */
    protected String email;

    public Warehouse (String name, Address address, String phoneNumber, String email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
    }
}
