package com.dmatek.record.bean;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 14:38
 * @Version 1.0
 */
public class Permission {

    private long id;
    private String url;
    private String name;
    private String description;
    private long pid;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getPid() {
        return pid;
    }

    public void setPid(long pid) {
        this.pid = pid;
    }
}
