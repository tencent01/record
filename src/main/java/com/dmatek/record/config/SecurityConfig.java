package com.dmatek.record.config;


import com.dmatek.record.filter.CustomAuthenticationFilter;
import com.dmatek.record.filter.JWTAuthenticationFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.DigestUtils;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 15:33
 * @Version 1.0
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final static Logger logger= LoggerFactory.getLogger(SecurityConfig.class);

    /*public static String[] AUTH_WHITELIST={
            "/static/**",
            "/home/index","/index.html",
            "/user/login","/user/update/password",
            "/user/login/test","/user/login/page","/user/login/error",
            "/error/401",
            "/websocket",
            "/file/get","/file/all","/file/read",
            "/blog/upload/img","/blog/new","/blog/get","/blog/delete",
            "/record/add","/record/delete","/record/search"
    };*/

    public static String[] AUTH_WHITELIST={
            "/static/**",
            "/user/login","/user/update/password","/user/login/page",
            "/error/401",
            "/file/all",
            "/blog/get",
            "/websocket"

    };

    @Autowired
    private UserDetailsService userDetailsService;


    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        logger.info("全局配置");
        //校验用户
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(new PasswordEncoder() {

            /**
             * 对密码进行加密
             * @param charSequence
             * @return
             */
            @Override
            public String encode(CharSequence charSequence) {
                logger.info("PasswordEncoder.encode 校验用户 对密码进行加密"+DigestUtils.md5DigestAsHex(charSequence.toString().getBytes()));
                return DigestUtils.md5DigestAsHex(charSequence.toString().getBytes());
            }


            /**
             * 对密码进行判断匹配
             * @param charSequence
             * @param s
             * @return
             */
            @Override
            public boolean matches(CharSequence charSequence, String s) {
                logger.info("PasswordEncoder.matches 校验用户 对密码进行判断匹配"+DigestUtils.md5DigestAsHex(charSequence.toString().getBytes()));
                logger.info("PasswordEncoder.matches 校验用户 对密码进行判断匹配"+s);
                return s.equals(DigestUtils.md5DigestAsHex(charSequence.toString().getBytes()));
            }
        });
    }



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        logger.info("configure 配置url");
        http.authorizeRequests().antMatchers(AUTH_WHITELIST).permitAll().anyRequest().authenticated()
                .and().formLogin().disable()
                /*.loginPage("/user/login/page")*/
                /*.usernameParameter("username")
                .passwordParameter("password")
                .loginProcessingUrl("/user/login")
                .successHandler(new AuthenticationSuccessHandler() {
                    @Override
                    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                        logger.info("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
                    }
                })
                .failureHandler(new AuthenticationFailureHandler() {
                    @Override
                    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                        logger.info("BBBBBBBBBBBBBBBBBBBBBBBBBBB");
                    }
                })*/
//                .failureUrl("/user/login/error")
                .logout().logoutSuccessUrl("/success/ok")
                .and().exceptionHandling().accessDeniedPage("/error/401")
                .and().cors()
                .and().csrf().disable().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(jwtAuthenticationFilter(),UsernamePasswordAuthenticationFilter.class);
//                http.addFilterAt(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JWTAuthenticationFilter jwtAuthenticationFilter(){
        return new JWTAuthenticationFilter();
    };


    //注册自定义的UsernamePasswordAuthenticationFilter
    /*@Bean
    CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter();
        filter.setFilterProcessesUrl("/user/login");
        filter.setAuthenticationSuccessHandler(new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
                logger.info("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            }
        });
        filter.setAuthenticationFailureHandler(new AuthenticationFailureHandler() {
            @Override
            public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
                logger.info("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
            }
        });
        //这句很关键，重用WebSecurityConfigurerAdapter配置的AuthenticationManager，不然要自己组装AuthenticationManager
        filter.setAuthenticationManager(authenticationManagerBean());
        return filter;
    }*/
}
