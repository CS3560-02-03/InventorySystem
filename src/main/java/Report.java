package main.java;

import java.util.Date;

/**Class for storing information about reports */
public class Report {

    /**ID of the report */
    protected int id;

    /**Date the report was created */
    protected Date dateCreated;

    /**Product the report is related to */
    protected Product product;

    /**Additional information about the report */
    protected String reportInfo;
}
