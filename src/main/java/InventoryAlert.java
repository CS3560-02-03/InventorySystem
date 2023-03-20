package main.java;

import java.util.Date;

/**Alert for inventory */
public class InventoryAlert {

    /**ID of the alert */
    protected int alertID;

    /**Date alert was created */
    protected Date dateCreated;

    /**Date alert was fulfilled */
    protected Date dateFulfilled;

    /**Is the alert fulfilled? */
    protected boolean fulfilled;

    /**
     * Create a new Inventory Alert
     */
    public InventoryAlert() {
        //id = generate random id
        //dateCreated = generate current date
        fulfilled = false;
    }

    /**Fulfill the alert */
    public void Fulfill() {
        this.dateFulfilled = new Date();
        this.fulfilled = true;
    }

    /**
     * Get whether or not the alert has been fulfilled
     * @return fulfilled
     */
    public boolean isFulfilled() {
        return fulfilled;
    }

    /**
     * @return id of the InventoryAlert
     */
    public int getAlertID(){
        return alertID;
    }

    /**
     * @return The date on which the InventoryAlert was created
     */
    public Date getDateCreated(){
        return dateCreated;
    }

    /**
     * @return The date on which the InventoryAlert was fulfilled
     */
    public Date getDateFulfilled(){
        return dateFulfilled;
    }

    


}
