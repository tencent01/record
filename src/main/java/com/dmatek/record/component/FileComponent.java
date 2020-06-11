package com.dmatek.record.component;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.bean.JSTreeNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/11 17:00
 * @Version 1.0
 */
@Component
public class FileComponent {

    private final static Logger logger= LoggerFactory.getLogger(FileComponent.class);

    public BlogNode fileToBlogNode(){
        File file=new File(getClass().getClassLoader().getResource("static/blog").getFile());
        return fileToBlogNode(file);
    }

    private BlogNode fileToBlogNode(File file){
        BlogNode blogNode=new BlogNode();
        blogNode.setName(file.getName());
        String path=file.getPath();
        String rootPath=getClass().getClassLoader().getResource("static/blog").getFile().replace("/","\\");
        blogNode.setKey(("\\"+path).replace(rootPath+"\\",""));
        if(file.isDirectory()){
            File[] files=file.listFiles();
            List<BlogNode> blogNodes=new ArrayList<BlogNode>();
            for (int i = 0; i < files.length; i++) {
                blogNodes.add(fileToBlogNode(files[i]));
            }
            blogNode.setBlogNodes(blogNodes);
        }
        return blogNode;
    }

    public List<BlogNode> fileToBlogNodeList(){
        File file=new File(getClass().getClassLoader().getResource("static/blog").getFile());
        List<BlogNode> blogNodes=new ArrayList<BlogNode>();
        File[] files=file.listFiles();
        for (int i = 0; i < files.length; i++) {
            blogNodes.add(fileToBlogNode(files[i]));
        }
        return blogNodes;
    }


    private JSTreeNode fileToJSTreeNode(File file){
        JSTreeNode jsTreeNode=new JSTreeNode();
        String path=file.getPath();
        String rootPath=getClass().getClassLoader().getResource("static/blog").getFile().replace("/","\\");
        logger.info(path);
        logger.info(rootPath);
        jsTreeNode.setId(("\\"+path).replace(rootPath+"\\",""));
        jsTreeNode.setText(file.getName());
        if(file.isDirectory()){
            File[] files=file.listFiles();
            List<JSTreeNode> jsTreeNodes=new ArrayList<JSTreeNode>();
            for (int i = 0; i < files.length; i++) {
                jsTreeNodes.add(fileToJSTreeNode(files[i]));
            }
            jsTreeNode.setChildren(jsTreeNodes);
        }else{
            jsTreeNode.setType("file");
        }
        return jsTreeNode;
    }

    public List<JSTreeNode> fileToJsTreeNodeList(){
        File file=new File(getClass().getClassLoader().getResource("static/blog").getFile());
        List<JSTreeNode> jsTreeNodes=new ArrayList<JSTreeNode>();
        File[] files=file.listFiles();
        for (int i = 0; i < files.length; i++) {
            jsTreeNodes.add(fileToJSTreeNode(files[i]));
        }
        return jsTreeNodes;
    }


}
