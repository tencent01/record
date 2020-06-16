package com.dmatek.record.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 13:38
 * @Version 1.0
 */
@Controller
@RequestMapping("home")
public class HomeController {

    private final static Logger logger= LoggerFactory.getLogger(HomeController.class);
    private final static String TAG="home";

    @RequestMapping("index")
    public String home(){
        logger.info(TAG+"/index");
        return "../static/index.html";
    }
}
