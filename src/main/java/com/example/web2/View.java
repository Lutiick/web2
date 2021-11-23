package com.example.web2;

public class View {
    static private String sussessFormat = "{" +
            "\"x\": \"%d\"," +
            "\"y\": \"%f\"," +
            "\"r\": \"%f\"," +
            "\"current_time\": \"%s\"," +
            "\"hit\": \"%s\"" +
            "}";
    static private String errorFormat = "{\"error\": \"%s\"}";

    public static String makeSuccess(HitData hitData) {
        return String.format(
                sussessFormat,
                hitData.getX(),
                hitData.getY(),
                hitData.getR(),
                hitData.getCurrentTime(),
                hitData.getHit()
                );
    }

    public static String makeError(String error) {
        return String.format(
                errorFormat,
                error
        );
    }

    public static String makeSusseccClean() {
        return "Success";
    }
}
