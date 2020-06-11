package com.dmatek.record.bean;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/9 15:27
 * @Version 1.0
 */
public class JSTreeNode {
    private String id;
    private String text;
    private State state;
    private List<JSTreeNode> children;
    private String type;


    public JSTreeNode() {
    }

    public JSTreeNode(String id, String text, State state, List<JSTreeNode> children) {
        this.id = id;
        this.text = text;
        this.state = state;
        this.children = children;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public List<JSTreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<JSTreeNode> children) {
        this.children = children;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

class State{
    private boolean opened;
    private boolean selected;

    public State() {
    }

    public State(boolean opened, boolean selected) {
        this.opened = opened;
        this.selected = selected;
    }

    public boolean isOpened() {
        return opened;
    }

    public void setOpened(boolean opened) {
        this.opened = opened;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
