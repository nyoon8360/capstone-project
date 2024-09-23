package org.lonic.data;

public class DataAccessException extends Exception {

    public DataException(String message) {
        super(message);
    }

    public DataException(String message, Throwable cause) {
        super(message, cause);
    }
}
