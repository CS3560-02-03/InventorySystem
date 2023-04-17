package main.java.utils;

import java.util.Base64;
import java.util.Random;

public class UniqueID {

    /**
     * Returns a random Base64 encoded string of given length.
     * IMPORTANT: Only generates the ID, does not validate if it is unique.
     * @param bytes : how many bytes to generate
     * @return
     */
    public static String GenerateID(int bytes) {

        //ensure we got a multiple of 8, if not round up.
        bytes+=(bytes % 8);
        //Generate a Base64 encoded string to use as an ID
        Random rand = new Random();
        byte[] r = new byte[128];
        rand.nextBytes(r);
        return Base64.getUrlEncoder().encodeToString(r);
    }
}
