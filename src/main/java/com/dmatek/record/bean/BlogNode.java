package com.dmatek.record.bean;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/9 11:09
 * @Version 1.0
 */
public class BlogNode {

    private String id;
    private String key;
    private String name;
    private List<BlogNode> blogNodes;
    private byte state;

    public BlogNode() {
    }

    public BlogNode(String name) {
        this.name = name;
    }

    public BlogNode(List<BlogNode> blogNodes) {
        this.blogNodes = blogNodes;
    }

    public BlogNode(String name, List<BlogNode> blogNodes) {
        this.name = name;
        this.blogNodes = blogNodes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<BlogNode> getBlogNodes() {
        return blogNodes;
    }

    public void setBlogNodes(List<BlogNode> blogNodes) {
        this.blogNodes = blogNodes;
    }

    public byte getState() {
        return state;
    }

    public void setState(byte state) {
        this.state = state;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
