package com.example.web2;

import java.util.Iterator;

public class View {
    static private final String successFormat = "{" +
            "\"x\": \"%f\"," +
            "\"y\": \"%f\"," +
            "\"r\": \"%f\"," +
            "\"current_time\": \"%s\"," +
            "\"hit\": \"%s\"" +
            "}";
    static private final String errorFormat = "{\"error\": \"%s\"}";
    static private final String listFormat = "[%s]";

    public static String makeSuccess(HitData hitData) {
        return String.format(
                successFormat,
                hitData.getX(),
                hitData.getY(),
                hitData.getR(),
                hitData.getCurrentTime(),
                hitData.getHit()
                );
    }

    public static String makeSuccessList(HitData.ListHitsData hitsData) {
        StringBuilder result = new StringBuilder();
        Iterator<HitData> iterator = hitsData.getIterator();
        while(iterator.hasNext()) {
            result.append(makeSuccess(iterator.next()));
            if (iterator.hasNext()) {
                result.append(",");
            }
        }
        return String.format(
                listFormat,
                result.toString()
        );
    }

    public static String makeError(String error) {
        return String.format(
                errorFormat,
                error
        );
    }

    public static String makeSuccessClean() {
        return "Success";
    }
}
