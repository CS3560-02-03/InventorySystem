package main.java;

import java.util.Date;

/**Information about a shipment */
public class Shipment {

    /**ID of the shipment */
    protected int shipmentID;

    /**Status of the shipment */
    protected String status;

    /**Tracking number of the shipment */
    protected String trackingNum;

    /**Date the shipment was sent out */
    protected Date dateTimeShipped;

    /**Date the shipment arrived at its destination */
    protected Date dateTimeArrived;
}
