package com.dmatek.record.services.impl;

import com.dmatek.record.services.ThymeleafService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/16 15:24
 * @Version 1.0
 */
@Service
public class ThymeleafServiceImpl implements ThymeleafService {

    private final static Logger logger= LoggerFactory.getLogger(ThymeleafServiceImpl.class);

    @Autowired
    private TemplateEngine templateEngine;
    @Override
    public void createHtml(String modelName,String path) {
        try(FileWriter fileWriter=new FileWriter(path);) {
            Context context=new Context();
            templateEngine.process(modelName,context,fileWriter);
        } catch (IOException e) {
            logger.error(e.toString());
        }
    }

    @Override
    public void createBlogHtml(String modelName, String path, Map<String,Object> map) {
        logger.info(map.toString());
        try(FileWriter fileWriter=new FileWriter(path);) {
            Context context=new Context();
            context.setVariables(map);
            templateEngine.process(modelName,context,fileWriter);
        } catch (IOException e) {
            logger.error(e.toString());
        }
    }

    @Override
    public void deleteHtml() {

    }
}
