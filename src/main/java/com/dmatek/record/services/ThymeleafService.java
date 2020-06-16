package com.dmatek.record.services;

import java.util.List;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/16 15:23
 * @Version 1.0
 */
public interface ThymeleafService {
    void createHtml(String modelName,String path);
    void createBlogHtml(String modelName, String path, Map<String,Object> map);
    void deleteHtml();
}
