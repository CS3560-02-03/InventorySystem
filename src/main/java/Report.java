package main.java;
import java.util.Date;
import main.java.utils.UniqueID;

/**Class for storing information about reports */
public class Report {

    /**ID of the report */
    protected String id;

    /**Date the report was created */
    protected Date dateCreated;

    /**Product the report is related to */
    protected Product product;

    /**Additional information about the report */
    protected String reportInfo;

    /** Stores time period of the data analyzed by the report */
    protected Date[] timeFrame;

    public Report(Product product, Date[] timeFrame){

        
        this.id = UniqueID.GenerateID(128);

        dateCreated = new Date();
        this.timeFrame = new Date[2];
        this.timeFrame[0] = timeFrame[0];
        this.timeFrame[1] = timeFrame[1];
    }
}
