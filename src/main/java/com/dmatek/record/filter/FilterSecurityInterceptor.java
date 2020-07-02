package com.dmatek.record.filter;

import com.dmatek.record.manager.AccessDecisionManagerImpl;
import com.dmatek.record.services.impl.UserDetailsServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.SecurityMetadataSource;
import org.springframework.security.access.intercept.AbstractSecurityInterceptor;
import org.springframework.security.access.intercept.InterceptorStatusToken;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import java.io.IOException;
import java.util.logging.LogRecord;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 15:23
 * @Version 1.0
 */
@Component
public class FilterSecurityInterceptor extends AbstractSecurityInterceptor implements Filter {

    private final static Logger logger= LoggerFactory.getLogger(FilterSecurityInterceptor.class);

    @Autowired
    private FilterInvocationSecurityMetadataSource filterInvocationSecurityMetadataSource;

    @Autowired
    public void setAccessDecisionManager(AccessDecisionManager accessDecisionManager){
        logger.info("设置访问决策管理");
        super.setAccessDecisionManager(accessDecisionManager);
    }

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        logger.info("调用过滤器FilterSecurityInterceptor");

        logger.info(String.valueOf(userDetailsService==null));
        FilterInvocation filterInvocation=new FilterInvocation(servletRequest,servletResponse,filterChain);
        invoke(filterInvocation);
    }

    public void invoke(FilterInvocation filterInvocation) throws IOException, ServletException {

        InterceptorStatusToken token = super.beforeInvocation(filterInvocation);
        try {
            logger.info("执行下一个过滤器");
            //执行下一个拦截器
            filterInvocation.getChain().doFilter(filterInvocation.getRequest(), filterInvocation.getResponse());
        } finally {
            logger.info("执行完过滤器后");
            super.afterInvocation(token, null);
        }
    }

    @Override
    public Class<?> getSecureObjectClass() {
        logger.info("获取数据对象类型");
        return FilterInvocation.class;
    }

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        logger.info("获取安全元数据");
        System.out.println(getClass().getClassLoader().getResource("").getFile());
        return this.filterInvocationSecurityMetadataSource;
    }


}
