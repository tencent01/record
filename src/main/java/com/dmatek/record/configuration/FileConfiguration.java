package com.dmatek.record.configuration;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.bean.JSTreeNode;
import com.dmatek.record.component.FileComponent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/11 16:59
 * @Version 1.0
 */

@Configuration
public class FileConfiguration {

    private final static Logger logger= LoggerFactory.getLogger(FileConfiguration.class);
    @Autowired
    private FileComponent fileComponent;

    @Bean
    public BlogNode fileToBlogNode(){
        return fileComponent.fileToBlogNode();
    }

    @Bean("blogList")
    public List<BlogNode> fileToBlogNodeList(){
        return fileComponent.fileToBlogNodeList();
    }

    /*@Bean("JsTreeList")
    public List<JSTreeNode> fileToJsTreeNodeList(){
        return fileComponent.fileToJsTreeNodeList();
    }*/


}
