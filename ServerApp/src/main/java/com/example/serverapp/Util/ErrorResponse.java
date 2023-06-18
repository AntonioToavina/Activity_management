package com.example.serverapp.Util;

public class ErrorResponse {

    Object error;

    public ErrorResponse(Object obj) {
        this.error = obj;
    }

    public Object getError() {
        return error;
    }

    public void setError(Object error) {
        this.error = error;
    }
}
