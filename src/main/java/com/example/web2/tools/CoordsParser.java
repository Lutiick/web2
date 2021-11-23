package com.example.web2.tools;

public class CoordsParser {
    static public Double parseDouble(String x) throws NumberFormatException{
        x = x.trim();
        x = x.replace(",", ".");
        return Double.parseDouble(x);
    }

    static public Integer parseInt(String x) throws NumberFormatException{
        x = x.trim();
        x = x.replace(",", ".");
        return Integer.parseInt(x);
    }
}
