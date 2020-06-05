package com.dmatek.record.filter;

import com.dmatek.record.manager.AccessDecisionManagerImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void setAccessDecisionManager(AccessDecisionManagerImpl accessDecisionManager){
        logger.info("set AccessDecisionManagerImpl");
        super.setAccessDecisionManager(accessDecisionManager);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        logger.info("filter filterInvocation");
        FilterInvocation filterInvocation=new FilterInvocation(servletRequest,servletResponse,filterChain);
        invoke(filterInvocation);
    }

    public void invoke(FilterInvocation filterInvocation) throws IOException, ServletException {

        InterceptorStatusToken token = super.beforeInvocation(filterInvocation);
        try {
            logger.info("filter invoke");
            //执行下一个拦截器
            filterInvocation.getChain().doFilter(filterInvocation.getRequest(), filterInvocation.getResponse());
        } finally {
            logger.info("filter afterInvocation");
            super.afterInvocation(token, null);
        }
    }

    @Override
    public Class<?> getSecureObjectClass() {
        logger.info("getSecureObjectClass");
        return FilterInvocation.class;
    }

    @Override
    public SecurityMetadataSource obtainSecurityMetadataSource() {
        logger.info("obtainSecurityMetadataSource");
        return this.filterInvocationSecurityMetadataSource;
    }


}
