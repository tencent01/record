package com.dmatek.record.controller.operation;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.services.BlogService;
import com.dmatek.record.services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/18 9:10
 * @Version 1.0
 */
@RestController
@RequestMapping("record")
public class RecordController {


    @Autowired
    private BlogService blogService;
    @Autowired
    private FileService fileService;

    @CrossOrigin
    @RequestMapping("delete")
    public List<BlogNode> delete(String path){
        String filePath=getClass().getClassLoader().getResource("static/blog").getFile();
        if(path!=null){
            filePath=filePath+"/"+path;
        }
        File file=new File(filePath);
        fileService.deleteDir(file);
        return blogService.allFile();
    }

    @CrossOrigin
    @RequestMapping("add")
    public List<BlogNode> add(String path){
        fileService.createDir(path);
        return blogService.allFile();
    }

}
