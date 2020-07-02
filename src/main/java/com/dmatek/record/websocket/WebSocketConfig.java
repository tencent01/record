package com.dmatek.record.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/20 11:42
 * @Version 1.0
 */
@Configuration
public class WebSocketConfig {
    private final static Logger logger= LoggerFactory.getLogger(WebSocketConfig.class);


    @Bean
    public ServerEndpointExporter serverEndpointExporter(){
        return new ServerEndpointExporter();
    }

}
