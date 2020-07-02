package com.dmatek.record.controller.operation;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.bean.JSTreeNode;
import com.dmatek.record.services.BlogService;
import com.dmatek.record.services.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/9 10:17
 * @Version 1.0
 */
@RestController
@RequestMapping("file")
public class FileController {

    private final static Logger logger= LoggerFactory.getLogger(FileController.class);
    private final static String TAG="file";

    @Autowired
    private FileService fileService;


    @Autowired
    private BlogService blogService;



//    @Autowired
//    private BlogNode blogNode;



    /*@Autowired
    @Qualifier("blogList")
    private List<BlogNode> blogList;

    @Autowired
    @Qualifier("JsTreeList")
    private List<JSTreeNode> jsTreeNodes;

    @CrossOrigin
    @RequestMapping("get")
    public List<JSTreeNode> getDir(){

        return jsTreeNodes;
    }*/

    @CrossOrigin
    @RequestMapping("all")
    public List<BlogNode> getAllDir(){
        logger.info(TAG+"all");
        return blogService.allFile();
    }

    @CrossOrigin
    @RequestMapping("read")
    public List<byte[]> readFile(@RequestParam("keys") String path){
        logger.info(TAG+"_read: "+path);
        return fileService.readFile(path);
    }

}
