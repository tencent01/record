package com.dmatek.record.component;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.bean.JSTreeNode;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
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

//        String rootPath="file:/home/money/blog/";
        File file=new File(getClass().getClassLoader().getResource("static/blog").getFile());
        return fileToBlogNode(file);
    }

    private BlogNode fileToBlogNode(File file){
        BlogNode blogNode=new BlogNode();
        String fileName=file.getName();
        String[] fileNames=fileName.split("_");

        if(fileNames.length==2){
            blogNode.setName(fileNames[0]);
            blogNode.setId(fileNames[1]);
        }else{
            blogNode.setName(fileName);
        }
        String path=file.getPath();
//        String rootPath="/home/money/blog/";
        String rootPath=getClass().getClassLoader().getResource("static/blog").getFile().replace("/","\\");
        blogNode.setKey(("\\"+path).replace(rootPath+"\\",""));
        if(file.isDirectory()){
            File[] files=file.listFiles();
            List<BlogNode> blogNodes=new ArrayList<BlogNode>();
            for (int i = 0; i < files.length; i++) {
                blogNodes.add(fileToBlogNode(files[i]));
            }
            blogNode.setBlogNodes(blogNodes);
        }else{
            try {
                Document document= Jsoup.parse(file,"UTF-8");
                Element element=document.getElementById("blogstate");

                /*Element[] elements=new Element[]{
                        document.getElementById("blogname"),
                        document.getElementById("createdate"),
                        document.getElementById("createname"),
                        document.getElementById("helpusername"),
                        document.getElementById("blgdescription"),
                        document.getElementById("blogstate")
                };
               for(Element element1:elements){
                   if(element1!=null){
                       logger.info(element1.text());
                   }
               }*/
                if(element!=null){
                    String stateLab=element.text();
                    if("暂缓".equals(stateLab)){
                        blogNode.setState((byte)0);
                    }else if("进行中".equals(stateLab)){
                        blogNode.setState((byte)1);
                    }else if("已完成".equals(stateLab)){
                        blogNode.setState((byte)2);
                    }
                }
            } catch (IOException e) {
                logger.error(e.toString());
            }
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

//        String rootPath="/home/money/blog/";
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
