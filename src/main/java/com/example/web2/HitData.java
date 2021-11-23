package com.example.web2;

import java.util.ArrayList;
import java.util.Iterator;

public class HitData {
    private Integer x;
    private Double y;
    private Double r;
    private String currentTime;
    private Boolean hit;

    public HitData() {
    }

    public void setX(int x) {
        this.x = x;
    }
    public void setY(double y) {
        this.y = y;
    }
    public void setR(double r) {
        this.r = r;
    }
    public void setHit(boolean hit) {
        this.hit = hit;
    }
    public void setCurrentTime(String time) {
        this.currentTime = time;
    }
    public Integer getX() {
        return x;
    }
    public Double getY() {
        return y;
    }
    public Double getR() {
        return r;
    }
    public String getCurrentTime() {
        return currentTime;
    }
    public Boolean getHit() {
        return hit;
    }

    public static class ListHitsData{
        private ArrayList<HitData> HitsData;

        public ListHitsData() {
            HitsData = new ArrayList<HitData>();
        }

        public void add(HitData e) {
            HitsData.add(e);
        }

        public ArrayList<HitData> getList() {
            return HitsData;
        }
        public HitData get(int index) {
            return HitsData.get(index);
        }
        public Integer length() {
            return HitsData.size();
        }
        public Iterator<HitData> getIterator() {
            return HitsData.iterator();
        }
    }
}
