package com.dmatek.record.controller.login;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.User;
import com.dmatek.record.config.SecurityConfig;
import com.dmatek.record.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 13:38
 * @Version 1.0
 */
@RequestMapping("user")
@RestController
public class LoginController {

    private final static Logger logger= LoggerFactory.getLogger(LoginController.class);
    private final static String TAG="user";

    @Autowired
    private UserService userService;

    @CrossOrigin
    @PostMapping("login")
    public int login(@RequestBody User user){
        logger.info(TAG+"/login:"+user.toString());
        User user1=userService.selectUserByUsername(user.getUsername(),user.getPassword());
        if(user1!=null){
            return 0;
        }
        return 1;
    }

    @CrossOrigin
    @PostMapping("update/password")
    public int updatePassword(@RequestBody JSONObject jsonObject){
        String username=jsonObject.getString("username");
        String oldpassword=jsonObject.getString("oldpassword");
        String password=jsonObject.getString("password");

        logger.info("update/password"+username);
        logger.info("update/password"+oldpassword);
        logger.info("update/password"+password);

        if(username!=null&&oldpassword!=null&&password!=null){
            logger.info("not null");
            User user=userService.selectUserByUsername(username,oldpassword);
            logger.info("not null");
            if(user!=null){
                logger.info(user.toString());
                boolean ok=userService.updateUserPassword(user.getUsername(),password);
                logger.info(ok+"");
                return 0;
            }
        }
        return 1;
    }

    @CrossOrigin
    @GetMapping("login/page")
    public String getLoginPage(){
        logger.info(TAG+"/login/page:");
        return "this is login page";
    }

    @CrossOrigin
    @GetMapping("login/test")
    public String getLoginTest(){
        logger.info(TAG+"/login/test:");
        return "this is test page";
    }

    @CrossOrigin
    @GetMapping("login/error")
    public String getLoginError(){
        logger.info(TAG+"/login/error:");
        return "this is login error page";
    }
}
