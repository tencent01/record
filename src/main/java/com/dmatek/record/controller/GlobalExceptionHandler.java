package com.dmatek.record.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/19 15:26
 * @Version 1.0
 */
@ControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Map<String,String> resultError(){
        Map<String,String> result=new HashMap<String,String>();
        result.put("errorCode","500");
        result.put("errorMsg","系统错误");
        return result;
    }

}
