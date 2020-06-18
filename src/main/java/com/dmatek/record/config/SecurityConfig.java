package com.dmatek.record.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.DigestUtils;

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

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        logger.info("configureGlobal");
        //校验用户
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(new PasswordEncoder() {

            /**
             * 对密码进行加密
             * @param charSequence
             * @return
             */
            @Override
            public String encode(CharSequence charSequence) {
                logger.info("PasswordEncoder.encode 校验用户 对密码进行加密");
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
                logger.info("PasswordEncoder.matches 校验用户 对密码进行判断匹配");
                return s.equals(DigestUtils.md5DigestAsHex(charSequence.toString().getBytes()));
            }
        });
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        logger.info("configure 配置url");
        http.csrf().disable();
//        http.cors();
        http.authorizeRequests()
                .antMatchers("/user/login",
                        "/file/get","/blog/new","/file/all","/file/read",
                        "/blog/upload/img","/blog/get","/blog/delete",
                        "/record/delete","/record/add",
                        "/user/update/password",
                        "/home/index","/index.html",
                        "/user/login/test","/user/login/page","/user/login/error","/error/401",
                        "/static/**")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin().loginPage("/user/login/page").failureUrl("/user/login/error")
                .and()
                .exceptionHandling().accessDeniedPage("/error/401");
        http.logout().logoutSuccessUrl("/success/ok");
    }
}
