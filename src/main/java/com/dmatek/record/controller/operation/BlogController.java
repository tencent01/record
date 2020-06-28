package com.dmatek.record.controller.operation;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.lucence.Indexer;
import com.dmatek.record.services.BlogService;
import com.dmatek.record.services.ThymeleafService;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/12 16:09
 * @Version 1.0
 */
@Controller
@RequestMapping("blog")
public class BlogController {

    private final static Logger logger= LoggerFactory.getLogger(BlogController.class);
    private final static String TAG="blog";


    @Autowired
    private BlogService blogService;

    @Autowired
    private ThymeleafService thymeleafService;

    /**
     * {"blogname":"aaa",
     * "blgdescription":"<p>adasdas</p>",
     * "blogsolves":[{},"<p>cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc</p>"],
     * "blogstate":{"value":"ing","label":"记录中","key":"ing"},
     * "username":"asdas"}
     * @param jsonObject
     * @return
     */
    @CrossOrigin
    @PostMapping("new")
    @ResponseBody
    public JSONObject newBlog(@RequestBody  JSONObject jsonObject){
        String blogName=(String)jsonObject.get("blogname");
        String helpusername=(String)jsonObject.get("helpusername");
        Map blogstate=(Map)jsonObject.get("blogstate");
        String blgdeScription=(String)jsonObject.get("blgdescription");
        logger.info("blgdeScription:"+blgdeScription);

        Map<String,Object> jsonMap=(Map)jsonObject;
        String username="诸葛亮";
        jsonMap.put("createname",username);
        Calendar calendar= Calendar.getInstance();
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateTime=simpleDateFormat.format(calendar.getTime());
        jsonMap.put("createdate",dateTime);
        Object blogsolvesObject=jsonObject.get("blogsolves");

        if(blogsolvesObject!=null){
            List<Object> blogsolves=(List)blogsolvesObject;
            for (Object blogSolve:blogsolves){
                Map<String,Object> blogSolveObj=(Map)blogSolve;
                blogSolveObj.put("username",username);
                blogSolveObj.put("datetime",dateTime);
            }
        }else{
            List<Object> blogsolves=new ArrayList<>();
            blogsolvesObject=blogsolves;
        }

        String filePath=getClass().getClassLoader().getResource("static/blog").getFile();
        Object httpPath=jsonObject.get("path");
        if(httpPath!=null){
            filePath=filePath+"/"+httpPath.toString();
        }
        File file=new File(filePath+"/"+blogName+".html");
        if(file.exists()){
            filePath=filePath+ "/"+blogName+"_"+UUID.randomUUID().toString().replace("_","")+".html";
        }else{
            filePath=filePath+"/"+blogName+".html";
        }
        thymeleafService.createBlogHtml("index",filePath,jsonMap);

        JSONObject json=new JSONObject();
        json.put("codeCheck",true);
        json.put("msg",blogService.allFile());
        return json;
    }

    @CrossOrigin
    @RequestMapping("get")
    public String showBlog(String keys){
        return "../static/blog/"+keys;
    }




    @Autowired
    private Indexer indexer;

    @CrossOrigin
    @RequestMapping("delete")
    @ResponseBody
    public List<BlogNode> deleteBlog(String key){
        String filePath=getClass().getClassLoader().getResource("static/blog").getFile();
        if(key!=null){
            filePath=filePath+"/"+key;
        }
        File file=new File(filePath);
        if(file.delete()){
            file=null;
        }
//        System.out.println(blogService.allFile().toString());
        indexer.indexDelFile(new File(filePath));

        List<BlogNode> list=blogService.allFile();
        System.out.println(list.size());
        return list;
    }

    @CrossOrigin
    @PostMapping("upload/img")
    @ResponseBody
    public JSONObject updateImg(HttpServletRequest request,@RequestParam("files") MultipartFile multipartFile){
        try(FileOutputStream outputStream=new FileOutputStream(
                new File(getClass().getClassLoader().getResource("static/img").getFile()+
                        "/"+multipartFile.getOriginalFilename()));) {
            logger.info(TAG+"upload/img"+multipartFile.getName());
            logger.info(TAG+"upload/img"+multipartFile.getContentType());
            logger.info(TAG+"upload/img"+multipartFile.getOriginalFilename());
            logger.info(TAG+"upload/img"+multipartFile.getSize());
            outputStream.write(multipartFile.getBytes());
        } catch (IOException e) {
            logger.error(e.toString());
        }
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("url","/static/img/"+multipartFile.getOriginalFilename());
        return jsonObject;
    }

    @CrossOrigin
//    @PostMapping("upload/img")
    public JSONObject updateImg(HttpServletRequest request){
        logger.info(TAG+"upload/img");
//        try(FileOutputStream outputStream=new FileOutputStream(
//                new File(getClass().getClassLoader().getResource("static/img").getFile()+
//                        "/"+multipartFile.getOriginalFilename()));) {
//            logger.info(TAG+"upload/img"+multipartFile.getName());
//            logger.info(TAG+"upload/img"+multipartFile.getContentType());
//            logger.info(TAG+"upload/img"+multipartFile.getOriginalFilename());
//            logger.info(TAG+"upload/img"+multipartFile.getSize());
//            outputStream.write(multipartFile.getBytes());
//        } catch (IOException e) {
//            logger.error(e.toString());
//        }
        JSONObject jsonObject=new JSONObject();
        jsonObject.put("url","aaa");
        return jsonObject;
    }


}
