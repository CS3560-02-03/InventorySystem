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

    /**
     * @param name Name of manufacturer you want to set
     */
    public void setName(String name){
        this.name = name;
    }

    /**
     * @param phoneNumber Phone number of manufacturer you want to set
     */
    public void setPhoneNumber(String phoneNumber){
        this.phoneNumber = phoneNumber;
    }

    /**
     * @param address Address of manufacturer you want to set
     */
    public void setAddress(Address address){
        this.address = address;
    }

    /**
     * @return Name of manufacturer
     */
    public String getName(){
        return name;
    }

    /**
     * @return Phone number of manufacturer
     */
    public String getPhoneNumber(){
        return phoneNumber;
    }

    /**
     * @return Address of manufacturer
     */
    public Address getAddress(){
        return address;
    }

}
