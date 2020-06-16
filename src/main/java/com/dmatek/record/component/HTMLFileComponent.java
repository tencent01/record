package com.dmatek.record.component;

import org.springframework.stereotype.Component;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/16 13:57
 * @Version 1.0
 */
@Component
public class HTMLFileComponent {

    StringBuilder stringHtml=new StringBuilder();


    private void init(String title){
        stringHtml.append("<!DOCTYPE html>");
        stringHtml.append("<html lang=\"en\">");
        initHtml(title);
        stringHtml.append("</html>");
    }

    private void initHtml(String title){
        initHead("<meta charset=\"UTF-8\">"+"<title>"+title+"</title>"+"<style>"+
                "*,*:before,*:after{-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}"+
                "</style>");
        initBody();
    }

    private void initHead(String head){
        stringHtml.append("<head>");
        stringHtml.append(head);
        stringHtml.append("</head>");
    }

    private void initBody(){

    }
}
