package com.dmatek.record.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.config.SecurityConfig;
import com.dmatek.record.jsonwebtoken.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/22 13:40
 * @Version 1.0
 */
public class JWTAuthenticationFilter extends BasicAuthenticationFilter {



    private final static Logger logger= LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String url=request.getRequestURI();
        String header=request.getHeader(JwtUtil.AUTHORIZATION);
        JSONObject json=new JSONObject();
        if(null!= SecurityConfig.AUTH_WHITELIST&& Arrays.asList(SecurityConfig.AUTH_WHITELIST).contains(url)){
            chain.doFilter(request,response);
        }else if(StringUtils.isBlank(header)||!header.startsWith(JwtUtil.TOKEN_PREFIX)){
            json.put("codeCheck",false);
            json.put("msg","Token为空");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(JSON.toJSONString(json));
        }else{
            try {
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=getAuthentication(request,response);
                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                chain.doFilter(request,response);
            }catch (ExpiredJwtException e){
                json.put("codeCheck",false);
                json.put("msg","Token已过期");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("Token已过期: {} " + e);
            }catch (UnsupportedJwtException e){
                json.put("codeCheck",false);
                json.put("msg","Token格式错误");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("Token格式错误: {} " + e);
            }catch (MalformedJwtException e){
                json.put("codeCheck",false);
                json.put("msg","Token没有被正确构造");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("Token没有被正确构造: {} " + e);
            }catch (SignatureException e){
                json.put("codeCheck",false);
                json.put("msg","Token签名失败");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("Token签名失败: {} " + e);
            }catch (IllegalArgumentException e){
                json.put("codeCheck", false);
                json.put("msg", "Token非法参数异常");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("非法参数异常: {} " + e);
            }catch (Exception e){
                json.put("codeCheck", false);
                json.put("msg", "Invalid Token");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(JSON.toJSONString(json));
                logger.error("Invalid Token " + e.getMessage());
            }
        }
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request,HttpServletResponse response){
        String token=request.getHeader(JwtUtil.AUTHORIZATION);
        if(token!=null){
            String userName="";
            try{
                userName=JwtUtil.validateToken(token);
                if(StringUtils.isNotBlank(userName)){
                    return new UsernamePasswordAuthenticationToken(userName,null,new ArrayList<>());
                }
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
        }
        return null;

    }
}
