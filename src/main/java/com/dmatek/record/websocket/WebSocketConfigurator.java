package com.dmatek.record.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.websocket.Extension;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import java.util.List;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/7/2 9:54
 * @Version 1.0
 */
public class WebSocketConfigurator extends ServerEndpointConfig.Configurator {

    private final static Logger logger= LoggerFactory.getLogger(WebSocketConfigurator.class);


    public WebSocketConfigurator() {
        super();
    }

    @Override
    public String getNegotiatedSubprotocol(List<String> supported, List<String> requested) {
        logger.info("getNegotiatedSubprotocol:"+supported.size()+"(^_^)"+requested.size());
        return super.getNegotiatedSubprotocol(supported, requested);
    }

    @Override
    public List<Extension> getNegotiatedExtensions(List<Extension> installed, List<Extension> requested) {
        logger.info("getNegotiatedExtensions:"+installed.size()+"(^_^)"+requested.size());
        return super.getNegotiatedExtensions(installed, requested);
    }

    @Override
    public boolean checkOrigin(String originHeaderValue) {
        logger.info("checkOrigin:"+originHeaderValue);
        return super.checkOrigin(originHeaderValue);
    }

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        /*System.out.println("modifyHandshake");
        for (Map.Entry<String,List<String>> a:request.getHeaders().entrySet()){
            System.out.print(a.getKey());
            for (String b:a.getValue()){
                System.out.print(":"+b);
            }
            System.out.println();

        }
//        request.getHeaders().remove("sec-websocket-protocol");

        System.out.println("==========================================================================================");
        for (Map.Entry<String,List<String>> a:response.getHeaders().entrySet()){
            System.out.print(a.getKey());
            for (String b:a.getValue()){
                System.out.print(":"+b);
            }
            System.out.println();

        }*/

        if(request.getHeaders().containsKey("sec-websocket-protocol")){
            sec.getUserProperties().put("sec-websocket-protocol",request.getHeaders().get("sec-websocket-protocol"));
            logger.info("modifyHandshake:(^_^)"+request.getHeaders().get("sec-websocket-protocol"));
            response.getHeaders().put("sec-websocket-protocol",request.getHeaders().get("sec-websocket-protocol"));
        }

        super.modifyHandshake(sec, request, response);
    }

    @Override
    public <T> T getEndpointInstance(Class<T> clazz) throws InstantiationException {
        logger.info("getEndpointInstance:"+clazz.getName());
        return super.getEndpointInstance(clazz);
    }
}
