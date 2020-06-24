package com.dmatek.record.manager;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDecisionManager;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Iterator;

/**
 * @Author: admin
 * @Description:决策器 负责鉴定用户是否有访问对应资源（方法或URL）的权限
 * @Date: 2020/6/5 15:08
 * @Version 1.0
 */
@Component
public class AccessDecisionManagerImpl implements AccessDecisionManager {

    private final static Logger logger= LoggerFactory.getLogger(AccessDecisionManagerImpl.class);

    /**
     * 通过传递的参数来决定用户是否有访问对应受保护对象的权限
     *
     * @param authentication 包含了当前的用户信息，包括拥有的权限。这里的权限来源就是前面登录时UserDetailsService中设置的authorities。
     * @param object 就是FilterInvocation对象，可以得到request等web资源
     * @param collection 是本次访问需要的权限
     * @throws AccessDeniedException
     * @throws InsufficientAuthenticationException
     */
    @Override
    public void decide(Authentication authentication, Object object, Collection<ConfigAttribute> collection) throws AccessDeniedException, InsufficientAuthenticationException {
        logger.info("decide 通过传递的参数来决定用户是否有访问对应受保护对象的权限");
        logger.info("authentication name:"+authentication.getName());
        logger.info("authentication size:"+authentication.getAuthorities().size());
        if(null==collection||0>=collection.size()){
            return;
        }else {
            String needRole;
            for (Iterator<ConfigAttribute> iterator=collection.iterator();iterator.hasNext();){
                needRole=iterator.next().getAttribute();
                logger.info("needRole:"+needRole);
                for (GrantedAuthority grantedAuthority:authentication.getAuthorities()){
                    logger.info("Authority:"+grantedAuthority.getAuthority());
                    if(needRole.trim().equals(grantedAuthority.getAuthority().trim())){
                        logger.info("有访问权限");
                        return;
                    }else if(grantedAuthority.getAuthority().equals("ROLE_ANONYMOUS")){
                        logger.info("公开权限");
                        return;
                    }
                }
            }
            logger.info("当前访问没有权限");
            throw new AccessDeniedException("当前访问没有权限");
        }
    }


    /**
     * 表示此AccessDecisionManager是否能够处理传递的ConfigAttribute呈现的授权请求
     *
     * @param configAttribute
     * @return
     */
    @Override
    public boolean supports(ConfigAttribute configAttribute) {
        logger.info("decide 此AccessDecisionManager是否能够处理传递的ConfigAttribute呈现的授权请求");
        return true;
    }

    /**
     * 表示当前AccessDecisionManager实现是否能够为指定的安全对象（方法调用或Web请求）提供访问控制决策
     *
     * @param aClass
     * @return
     */
    @Override
    public boolean supports(Class<?> aClass) {
        logger.info("decide 当前AccessDecisionManager实现是否能够为指定的安全对象（方法调用或Web请求）提供访问控制决策");
        return true;
    }
}
