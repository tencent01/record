package com.dmatek.record.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 13:38
 * @Version 1.0
 */
@RestController
public class Controller {

    @RequestMapping
    public String home(){
        return "";
    }
}
