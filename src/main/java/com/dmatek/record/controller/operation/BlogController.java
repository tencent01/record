package com.dmatek.record.controller.operation;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;
import java.io.*;
import java.util.List;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/12 16:09
 * @Version 1.0
 */
@RestController
@RequestMapping("blog")
public class BlogController {

    private final static Logger logger= LoggerFactory.getLogger(BlogController.class);
    private final static String TAG="blog";

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
    public boolean newBlog(@RequestBody  JSONObject jsonObject){
        // 获取桌面路径
        FileSystemView fsv = FileSystemView.getFileSystemView();
        String desktop = fsv.getHomeDirectory().getPath();
        String filePath = desktop + "/template.xls";
        File file = new File(filePath);
        try(OutputStream outputStream = new FileOutputStream(file);) {


            XWPFDocument document = new XWPFDocument(POIXMLDocument.openPackage(filePath));
            List<XWPFParagraph> allParagraph = document.getParagraphs();

            HSSFWorkbook hssfWorkbook=new HSSFWorkbook();
            HSSFSheet sheet = hssfWorkbook.createSheet("Sheet1");
            HSSFRow row = sheet.createRow(0);
            row.createCell(0).setCellValue("记录名称");
            row.createCell(1).setCellValue("创建人");
            row.createCell(2).setCellValue("创建时间");
            row.createCell(3).setCellValue("协助人");
            row.createCell(4).setCellValue("记录状态");
            row.createCell(5).setCellValue("记录描述");
            row.createCell(6).setCellValue("记录过程");
            row.setHeightInPoints(30); // 设置行的高度
        } catch (FileNotFoundException e) {
            logger.error(e.toString());
        } catch (IOException e) {
            logger.error(e.toString());
        }
        logger.info(jsonObject.toJSONString());

        String blogName=(String)jsonObject.get("blogname");

        String helpusername=(String)jsonObject.get("helpusername");

        Map blogstate=(Map)jsonObject.get("blogstate");

        if("ok".equals(blogstate.get("key"))){

        }else if("ing".equals(blogstate.get("key"))){

        }else if("wait".equals(blogstate.get("key"))){

        }

        String blgdeScription=(String)jsonObject.get("blgdescription");

        List blogsolves=(List)jsonObject.get("blogsolves");
        logger.info(blogName);
        logger.info(blgdeScription);
        logger.info(helpusername);
        logger.info(blogstate.toString());
        logger.info(blogsolves.toString());
        return false;
    }

    @CrossOrigin
    @PostMapping("upload/img")
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
