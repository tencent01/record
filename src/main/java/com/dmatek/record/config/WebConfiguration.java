package com.dmatek.record.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/13 13:46
 * @Version 1.0
 */
public class WebConfiguration  {

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations(getClass().getClassLoader().getResource("static/").getFile());
    }
}
