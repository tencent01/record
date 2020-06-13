package com.dmatek.record.bean;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/12 16:13
 * @Version 1.0
 */
public class Record {
    private String key;
    private String title;
    private Date time;
    private User newUser;
    private List<User> helpUser;
    private String recordDes;
    private Map<Integer,String> recordSolves;
}
