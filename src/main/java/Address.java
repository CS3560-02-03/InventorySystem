package main.java;

/**
 * Street address.
 */
public class Address {

    /**Street number of an address */
    protected String number;

    /**Street of an address */
    protected String street;

    /**City of an address */
    protected String city;

    /**State of an address */
    protected String state;

    /**Zip code of an address */
    protected String zip;


    /**
     * Create a new street address.
     * @param number : Street number
     * @param street : Street name
     * @param city : City
     * @param state : State
     * @param zip : Zip code
     */
    public Address(String number, String street, String city, String state, String zip) {
        this.number = number;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    /**
     * Get the street number of an address
     * @return Street number
     */
    public String getStreetNumber() {
        return this.number;
    }

    /**
     * Get the street name of an address
     * @return Street name
     */
    public String getStreet() {
        return this.street;
    }

    /**
     * Get the city of an address
     * @return city
     */
    public String getCity() {
        return this.city;
    }

    /**
     * Get the state of an address
     * @return State
     */
    public String getState() {
        return this.state;
    }

    /**
     * Get the Zip code of an address
     * @return Zip code
     */
    public String getZip() {
        return this.zip;
    }

}
