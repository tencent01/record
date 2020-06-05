package com.dmatek.record.bean;

import org.springframework.security.core.GrantedAuthority;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 14:16
 * @Version 1.0
 */
public class Role implements GrantedAuthority {

    private long id;
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return name;
    }


    public Role() {
    }


    public Role(long id, String name) {
        this.id = id;
        this.name = name;
    }

}
