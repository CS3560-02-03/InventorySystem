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

    public InventoryAlert(int id, Date created, Date fulfilled, boolean isFulfilled) {
        this.alertID = id;
        this.dateCreated = created;
        this.dateFulfilled = fulfilled;
        this.fulfilled = isFulfilled;
    } 
}
