package com.dmatek.record.services.impl;

import com.dmatek.record.services.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/10 15:47
 * @Version 1.0
 */
@Service
public class FileServiceImpl implements FileService {

    private final static Logger logger= LoggerFactory.getLogger(FileServiceImpl.class);
    @Override
    public List<byte[]> readFile(String path) {
        logger.info(getClass().getClassLoader().getResource("static/blog").getFile()+"/"+path);
        List<byte[]> byteArrs=new ArrayList<byte[]>();
        try(FileInputStream fileInputStream=new FileInputStream(getClass().getClassLoader().getResource("static/blog").getFile()+"/"+path);) {
            byte[] bs = new byte[1024];
            int len=0;
            while ((len=fileInputStream.read(bs))!=-1){
                byteArrs.add(bs);
            }
        } catch (FileNotFoundException e) {
            logger.error("file read exception(FileNotFoundException)");
        } catch (IOException e) {
            logger.error("file read exception(IOException)");
        }
        return byteArrs;
    }

    @Override
    public void deleteDir(File file) {
        if(file.exists()){
            if(file.isDirectory()){
                File[] files=file.listFiles();
                for(int i=0;i<files.length;i++){
                    deleteDir(files[i]);
                }
            }
            file.delete();
            return;
        }
        return;
    }

    @Override
    public void createDir(String path) {
        File file=new File(getClass().getClassLoader().getResource("static/blog").getFile()+"/"+path);
        if(!file.exists()){
            file.mkdirs();
        }
    }


}
