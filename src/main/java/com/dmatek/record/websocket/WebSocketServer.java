package com.dmatek.record.websocket;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.jsonwebtoken.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpointConfig;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/20 11:47
 * @Version 1.0
 */
@ServerEndpoint(value = "/websocket",configurator= WebSocketConfigurator.class)
@Component
public class WebSocketServer {
    private final static Logger logger= LoggerFactory.getLogger(WebSocketServer.class);

    private static ConcurrentHashMap<String, List<Session>> sessionPools = new ConcurrentHashMap<>();
    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig){
        if(endpointConfig.getUserProperties().containsKey("sec-websocket-protocol")){
            Object sec=endpointConfig.getUserProperties().get("sec-websocket-protocol");
            if(sec instanceof List ){
                List secs=(List) sec;
                if(secs.size()>0&&secs.get(0) instanceof String){
                    String token=(String)secs.get(0);
                    String username=JwtUtil.validateToken(token);
                    logger.info(token);
                    if(sessionPools.containsKey(username)){
                        sessionPools.get(username).add(session);
                        logger.info("open ok"+sessionPools);
                        return;
                    }else{
                        List<Session> userSessionPools=new ArrayList<>();
                        userSessionPools.add(session);
                        sessionPools.put(username,userSessionPools);
                        logger.info("open first ok"+sessionPools);
                        return;
                    }
                }
            }
        }
        try {
            session.close();
        } catch (IOException e) {
            logger.error(e.toString());
        }
        logger.info("open fail"+sessionPools);
    }

    @OnClose
    public void onClose(Session session){
        for (Map.Entry<String,List<Session>> userSessions:sessionPools.entrySet()){
            if(userSessions.getValue().contains(session)){
                userSessions.getValue().remove(session);
            }
        }
        logger.info("close"+sessionPools);
    }

    @OnMessage
    public void onMessage(String message,Session session){
        logger.info("message"+message);
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
        JSONObject jsonObject=JSONObject.parseObject(message);
        logger.info(jsonObject.getString("msgType"));
        logger.info(jsonObject.getString("token"));

        String username=JwtUtil.validateToken(jsonObject.getString("token"));
        sendMsg(username,session.getId());
    }

    @OnError
    public void onError(Throwable error){
        logger.info("error"+error);
    }

    public static void sendMsg(String username,String msg){
        if(sessionPools.containsKey(username)){
            for(Session s:sessionPools.get(username)){
                try {
                    s.getBasicRemote().sendText(msg);
                } catch (IOException e) {
                    logger.info(e.toString());
                }
            }
        }
    }

}

class ClientSession{
    private Session session;
    private String username;

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ClientSession() {
    }

    public ClientSession(Session session, String username) {
        this.session = session;
        this.username = username;
    }

    public ClientSession(Session session) {
        this.session = session;
    }


}
