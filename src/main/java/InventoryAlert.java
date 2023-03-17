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
     * Create a new Inventory ALert
     * @param id : ID for the alert
     * @param created : Date the alert was created
     */
    //TODO: Overloads
    public InventoryAlert(int id, Date created) {
        this.alertID = id;
        this.dateCreated = created;
    }

    public InventoryAlert(int id) {
        this(id, new Date());
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
}
