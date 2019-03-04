package com.example.sqlitetest.models;

public class PictureModel {
    private int id;
    private String title;
    private String description;
    private String url;
    private String area;

    public PictureModel(int id, String title, String description, String url, String area) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.area = area;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    @Override
    public String toString() {
        return "PictureModel{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", url='" + url + '\'' +
                ", area='" + area + '\'' +
                '}';
    }
}
