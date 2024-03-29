package com.dmatek.record.filter;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.config.SecurityConfig;
import com.dmatek.record.jsonwebtoken.JwtUtil;
import com.dmatek.record.services.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

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
@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {



    private final static Logger logger= LoggerFactory.getLogger(JWTAuthenticationFilter.class);




    /*public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }*/

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String url=request.getRequestURI();
        String header=request.getHeader(JwtUtil.AUTHORIZATION);
        JSONObject json=new JSONObject();

        logger.info(String.valueOf(userDetailsService==null));
        logger.info("请求访问的url:"+url);
        String[] urls=url.split("/");
        if((null!= SecurityConfig.AUTH_WHITELIST&& Arrays.asList(SecurityConfig.AUTH_WHITELIST).contains(url))||(urls.length>1&&"static".equalsIgnoreCase(urls[1]))){
            logger.info("不存在token的公开url");
            chain.doFilter(request,response);
        }else if(StringUtils.isBlank(header)||!header.startsWith(JwtUtil.TOKEN_PREFIX)){
            json.put("codeCheck",false);
            json.put("msg","Token为空");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(JSON.toJSONString(json));
        }else{
            try {
                logger.info("token验证开始");
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
                    logger.info("token中获取的用户名:"+userName);
                    UserDetails userDetails=userDetailsService.loadUserByUsername(userName);
                    return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                }
                logger.info("token中无法获取用户名");
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
