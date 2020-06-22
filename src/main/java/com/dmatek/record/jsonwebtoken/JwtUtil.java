package com.dmatek.record.jsonwebtoken;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/22 9:19
 * @Version 1.0
 */
public class JwtUtil {

    private final static Logger logger= LoggerFactory.getLogger(JwtUtil.class);
    /**过期时间---24 hour*/
    private static final int EXPIRATION_TIME=60*60*24;
    /**自己设定的秘钥*/
    private static final String SECRET="023bdc63c3c5a4587*9ee6581508b9d03ad39a74fc0c9a9cce604743367c9646b";
    /**前缀*/
    public static final String TOKEN_PREFIX="Bearer";
    /**表头授权*/
    public static final String AUTHORIZATION="Authorization";


    public static String generateToken(String userName){
        Calendar calendar=Calendar.getInstance();
        Date now=calendar.getTime();
        calendar.setTime(new Date());
        calendar.add(calendar.SECOND,EXPIRATION_TIME);
        Date time=calendar.getTime();
        HashMap<String ,Object> map=new HashMap<>();
        map.put("userName",userName);
        String jwt= Jwts.builder()
                .setClaims(map)
                .setIssuedAt(now)
                .setExpiration(time)
                .signWith(SignatureAlgorithm.HS256,SECRET)
                .compact();

        logger.info(TOKEN_PREFIX+jwt);
        return TOKEN_PREFIX+jwt;
    }


    public static String validateToken(String token){
        try{
            logger.info(token);
            Map<String,Object> body=Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token.replace(TOKEN_PREFIX,""))
                    .getBody();

            logger.info(body.toString());
            String userName=body.get("userName").toString();
            logger.info(userName);
            return userName;
        }catch (ExpiredJwtException e){
            throw e;
        }catch (UnsupportedJwtException e){
            throw e;
        }catch (MalformedJwtException e){
            throw e;
        }catch (SignatureException e){
            throw e;
        }catch (IllegalArgumentException e){
            throw e;
        }catch (Exception e){
            throw e;
        }
//        return null;
    }



}
