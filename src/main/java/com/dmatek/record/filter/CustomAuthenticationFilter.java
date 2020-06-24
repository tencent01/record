package com.dmatek.record.filter;

import com.dmatek.record.bean.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/23 16:42
 * @Version 1.0
 */
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final static Logger logger= LoggerFactory.getLogger(UsernamePasswordAuthenticationFilter.class);


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        if(request.getContentType().equals(MediaType.APPLICATION_JSON_UTF8_VALUE)||request.getContentType().equals(MediaType.APPLICATION_JSON_VALUE)){
            ObjectMapper mapper=new ObjectMapper();
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=null;
            try (InputStream is = request.getInputStream()){
                User authenticationBean = mapper.readValue(is,User.class);
                logger.info(authenticationBean.toString());
                usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        authenticationBean.getUsername(), authenticationBean.getPassword());
            }catch (IOException e) {
                e.printStackTrace();
                usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                        "", "");
            }finally {
                setDetails(request, usernamePasswordAuthenticationToken);
                return this.getAuthenticationManager().authenticate(usernamePasswordAuthenticationToken);
            }
        }

        return super.attemptAuthentication(request, response);
    }
}
