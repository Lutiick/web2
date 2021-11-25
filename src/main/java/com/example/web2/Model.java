package com.example.web2;

import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Calendar;


public class Model {
    static HitData operate(Double x, Double y, Double r, HttpSession session) {
        String currentTime = new SimpleDateFormat("HH:mm:ss").format(Calendar.getInstance().getTime());
        boolean hit = checkHit(x, y, r);

        HitData newHitData = new HitData();
        newHitData.setX(x);
        newHitData.setY(y);
        newHitData.setR(r);
        newHitData.setHit(hit);
        newHitData.setCurrentTime(currentTime);

        Object maybe_hitsData = session.getAttribute("hitsdata");
        HitData.ListHitsData hitsData;
        if (maybe_hitsData != null) {
            hitsData = (HitData.ListHitsData) maybe_hitsData;
        } else {
            hitsData = new HitData.ListHitsData();
        }
        hitsData.add(newHitData);
        session.setAttribute("hitsdata", hitsData);

        return newHitData;
    }

    static public HitData.ListHitsData getHitsList(HttpSession session) {
        Object maybe_hitsData = session.getAttribute("hitsdata");
        HitData.ListHitsData hitsData;
        if (maybe_hitsData != null) {
            hitsData = (HitData.ListHitsData) maybe_hitsData;
        } else {
            hitsData = new HitData.ListHitsData();
        }
        return hitsData;
    }

    static public Boolean cleanHitData(HttpSession session) {
        session.removeAttribute("hitsdata");
        return true;
    }

    private static boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y - x >= -r;
    }

    private static boolean checkRectangle(double x, double y, double r) {
        return x >= 0 && y >= 0 && x <= r && y <= r;
    }

    private static boolean checkCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y*y <= r*r/4;
    }

    private static boolean checkHit(double x, double y, double r) {
        return checkTriangle(x, y, r) || checkRectangle(x, y, r)||checkCircle(x, y, r);
    }
}
