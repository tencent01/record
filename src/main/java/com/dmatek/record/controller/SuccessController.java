package com.dmatek.record.controller;

import com.dmatek.record.controller.login.LoginController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 16:49
 * @Version 1.0
 */
@RestController
@RequestMapping("success")
public class SuccessController {


    private final static Logger logger= LoggerFactory.getLogger(SuccessController.class);
    private final static String TAG="success";

    @RequestMapping("ok")
    public String success(){
        logger.info(TAG+"/ok");
        return "this is success page";
    }
}
