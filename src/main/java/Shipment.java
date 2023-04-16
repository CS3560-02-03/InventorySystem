package main.java;

import java.util.Date;
import main.java.utils.ShipmentStatus;

/**Information about a shipment */
public class Shipment {

    /**ID of the shipment */
    protected int shipmentID;

    /**Status of the shipment */
    protected ShipmentStatus status;

    /**Tracking number of the shipment */
    protected String trackingNum;

    /**Date the shipment was sent out */
    protected Date dateTimeShipped;

    /**Date the shipment arrived at its destination */
    protected Date dateTimeArrived;

    public Shipment(int id, ShipmentStatus status, String trackingNum, Date dateTimeShipped) {
        this.shipmentID = id;
        this.status = status;
        this.trackingNum = trackingNum;
        this.dateTimeShipped = dateTimeShipped;
    }
    
    public Shipment(int id, ShipmentStatus status) {
        this(id, status, null, null);
    }

    public Shipment(int id) {
        this(id, ShipmentStatus.PROCESSING);
    }

    /**Mark a shipment as shipped */
    public void Ship(String trackingNum) {
        this.status = ShipmentStatus.SHIPPED;
        this.trackingNum = trackingNum;
        this.dateTimeShipped = new Date();
    }

    /**Mark a shipment as delivered */
    public void Deliver() {
        this.status = ShipmentStatus.DELIVERED;
        this.dateTimeArrived = new Date();
    }
}
