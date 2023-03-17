package main.java;
/**
 * Class for storing information about a manufacturer.
 */
public class Manufacturer {

    /**Name of the manufacturer */
    protected String name;

    /**Phone number of the manufacturer */
    protected String phoneNumber;

    /**Address of the manufacturer */
    protected Address address;

    /**
     * Create a new manufacturer
     * @param name : Name of manufacturer
     * @param phoneNumber : Phone number of manufacturer
     * @param Address : Address of manufacturer
     */
    public Manufacturer(String name, String phoneNumber, Address address) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}
