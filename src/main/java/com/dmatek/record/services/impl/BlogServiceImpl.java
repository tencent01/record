package com.dmatek.record.services.impl;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.component.FileComponent;
import com.dmatek.record.services.BlogService;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.Arrays;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/11 16:44
 * @Version 1.0
 */
@Service
public class BlogServiceImpl implements BlogService {
    private final static Logger logger= LoggerFactory.getLogger(BlogServiceImpl.class);

    @Autowired
    private FileComponent fileComponent;

    @Override
    public List<BlogNode> allFile() {
        return fileComponent.fileToBlogNodeList();
    }

    @Override
    public void addSolve(JSONObject solve){
        String path=solve.getString("key");

        String rootPath=getClass().getClassLoader().getResource("static/blog").getFile().replace("/","\\");
        path=rootPath+"\\"+path;
        try {
            File file=new File(path);
            Document document= Jsoup.parse(file,"UTF-8");
            Element element=document.getElementById("blogsolves");
            Element elementUser=document.getElementById("createname");
            Element elementHelpUser=document.getElementById("helpusername");
            System.out.println(elementUser.text());
            System.out.println(elementHelpUser.text());
            String createName=solve.getString("createname");
            if(createName!=null&&(createName.equalsIgnoreCase(elementUser.text())|| Arrays.asList(elementHelpUser.text().split(",")).contains(createName))){
                if(element.children().size()==0){
                    element.append(
                            "<div>\n" +
                            "\n" +
                            "            <div id=\""+(element.children().size()+1)+"\" style=\"\">\n" +
                            "                <div style=\"height: 25px\">\n" +
                            "                    <div style=\"float: left;width: 10px;height: 100%\"></div>\n" +
                            "                    <span style=\"font-size:20px;font-weight: 900;color: #FF2400  !important\">"+solve.getString("createname")+"</span>\n" +
                            "                    <div style=\"text-align: right;display: inline-block;float: right\">\n" +
                            "                        <span style=\"margin-right:20px;color:#FF2400;display: inline-block;font-size:18px;\">"+solve.getString("createdate")+"</span>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "                <div style=\"margin: 10px 20px;letter-spacing:1px;line-height: 28px;\">"+solve.getString("solve")+"</div>\n" +
                            "                <div style=\"text-align: right;background-color: #767575\">\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>");
                }else{
                    element.append("<div>\n" +"<div>\n" +
                            "                <hr  style=\"margin-top:20px;margin-bottom:20px;border: 0;border-top: 1px solid rgba(0,0,0,0.1);\"/>\n" +
                            "            </div>"+
                            "\n" +
                            "            <div id=\""+(element.children().size()+1)+"\" style=\"\">\n" +
                            "                <div style=\"height: 25px\">\n" +
                            "                    <div style=\"float: left;width: 10px;height: 100%\"></div>\n" +
                            "                    <span style=\"font-size:20px;font-weight: 900;color: #FF2400  !important\">"+solve.getString("createname")+"</span>\n" +
                            "                    <div style=\"text-align: right;display: inline-block;float: right\">\n" +
                            "                        <span style=\"margin-right:20px;color:#FF2400;display: inline-block;font-size:18px;\">"+solve.getString("createdate")+"</span>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "                <div style=\"margin: 10px 20px;letter-spacing:1px;line-height: 28px;\">"+solve.getString("solve")+"</div>\n" +
                            "                <div style=\"text-align: right;background-color: #767575\">\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>");
                }
                FileOutputStream fos = new FileOutputStream(file, false);
                OutputStreamWriter osw = new OutputStreamWriter(fos, "UTF-8");
                osw.write(document.html());
                osw.close();
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
