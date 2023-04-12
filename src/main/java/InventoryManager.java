package main.java;
import java.util.Date;

/**Information about an Inventory Manager */
public class InventoryManager {

    /**Inventory manager's Name */
    protected String name;

    /**ID number of the inventory manager */
    protected int id;

    /**Phone number ofthe inventory manager */
    protected String phoneNumber;

    public InventoryManager(String name, String phoneNumber){
        //generate random id
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    private Report generateReport(Product product, Date[] timeFrame){
        return new Report(product, timeFrame);
    }
}
