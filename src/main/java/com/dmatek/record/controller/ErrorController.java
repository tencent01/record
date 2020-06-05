package com.dmatek.record.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 16:14
 * @Version 1.0
 */
@RestController
@RequestMapping("error")
public class ErrorController {

    private final static Logger logger= LoggerFactory.getLogger(ErrorController.class);
    private final static String TAG="error";

    @CrossOrigin
    @RequestMapping("404")
    public String error404(){
        logger.error(TAG+"/404");
        return "this is error";
    }

    @CrossOrigin
    @RequestMapping("401")
    public String error401(){
        logger.warn(TAG+"/401");
        return "this is error";
    }
}
