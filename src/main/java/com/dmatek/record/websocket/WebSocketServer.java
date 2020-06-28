package com.dmatek.record.websocket;

import com.alibaba.fastjson.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/20 11:47
 * @Version 1.0
 */
@ServerEndpoint("/websocket")
@Component
public class WebSocketServer {
    private final static Logger logger= LoggerFactory.getLogger(WebSocketServer.class);

    @OnOpen
    public void onOpen(Session session){
        System.out.println(session.getId());
        logger.info("open");
    }

    @OnClose
    public void onClose(){

        logger.info("close");
    }

    @OnMessage
    public void onMessage(String message,Session session){
        logger.info("message"+message);
        JSONObject jsonObject=JSONObject.parseObject(message);
        logger.info(jsonObject.getString("msgType"));
        logger.info(jsonObject.getString("token"));
        try {
            session.getBasicRemote().sendText("AAAAAAA");
        } catch (IOException e) {
            logger.info(e.toString());
        }
    }

    @OnError
    public void onError(Throwable error){
        logger.info("error");
    }

}
