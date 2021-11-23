package com.example.web2.tools;

import java.util.Arrays;

public class Validator {
    static private int x_min = -3;
    static private int x_max = 5;
    static private float y_min = -5;
    static private float y_max = 3;
    static private Double r_possible[] = {1.0, 1.5, 2.0, 2.5, 3.0};



    static public boolean validateX(int x) {
        try {
            return (x >= x_min) && (x_max >= x);
        }
        catch (NumberFormatException e) {
            return false;
        }
    }

    static public boolean validateY(double y) {
        try {
            return (y >= y_min) && (y_max >= y);
        }
        catch (NumberFormatException e) {
            return false;
        }
    }

    static public boolean validateR(double r) {
        try {
            return Arrays.asList(r_possible).contains(r);
        }
        catch (NumberFormatException e) {
            return false;
        }
    }

    static public boolean validate(int x, double y, double r) {
        return validateX(x) && validateY(y) && validateR(r);
    }


}
