package com.dmatek.record.services.impl;

import com.dmatek.record.bean.Permission;
import com.dmatek.record.bean.Role;
import com.dmatek.record.mapper.PermissionMapper;
import com.dmatek.record.mapper.RoleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * @Author: admin
 * @Description: 用来储存请求与权限的对应关系
 * @Date: 2020/6/5 14:36
 * @Version 1.0
 */
@Service
public class InvocationSecurityMetadataSourceServiceImpl implements FilterInvocationSecurityMetadataSource {


    private final static Logger logger= LoggerFactory.getLogger(InvocationSecurityMetadataSourceServiceImpl.class);
    @Autowired
    private PermissionMapper permissionMapper;

    @Autowired
    private RoleMapper roleMapper;

    public InvocationSecurityMetadataSourceServiceImpl() {
        logger.info("构造器 请求与权限的对应关系");
    }

    /**
     * 每一个资源所需要的角色 Collection<ConfigAttribute>决策器会用到
     */
    private static HashMap<String,Collection<ConfigAttribute>> map=null;

    /**
     * 当接收到一个http请求时, filterSecurityInterceptor会调用的方法. 参数object是一个包含url信息的HttpServletRequest实例. 这个方法要返回请求该url所需要的所有权限集合
     * 返回请求的资源需要的角色
     * @param o
     * @return
     * @throws IllegalArgumentException
     */
    @Override
    public Collection<ConfigAttribute> getAttributes(Object o) throws IllegalArgumentException {
        logger.info("该url所需要的所有权限集合");
        if(null==map){
            loadResourceDefine();
        }

        //object 中包含用户请求的request 信息
        HttpServletRequest request = ((FilterInvocation)o).getHttpRequest();

        for(Iterator<String> iterator=map.keySet().iterator();iterator.hasNext();){
            String url=iterator.next();
            if(new AntPathRequestMatcher(url).matches(request)){
                return map.get(url);
            }
        }
        logger.info("该url权限集合为null");
        return null;
    }

    /**
     * Spring容器启动时自动调用, 一般把所有请求与权限的对应关系也要在这个方法里初始化, 保存在一个属性变量里。
     *
     * @return
     */
    @Override
    public Collection<ConfigAttribute> getAllConfigAttributes() {
        logger.info("请求与权限的对应关系也要在这个方法里初始化");
        return null;
    }

    /**
     * 指示该类是否能够为指定的方法调用或Web请求提供ConfigAttributes
     *
     * @param aClass
     * @return
     */
    @Override
    public boolean supports(Class<?> aClass) {
        logger.info("是否能够为指定的方法调用或Web请求提供ConfigAttributes:返回TRUE");
        return true;
    }


    /**
     * 初始化 所有资源 对应的角色
     */
    public void loadResourceDefine() {
        logger.info("初始化所有资源对应的角色");
        map = new HashMap<>(16);
        //权限资源 和 角色对应的表  也就是 角色权限 中间表
        List<Permission> permissions = permissionMapper.getPermissions();

        //某个资源 可以被哪些角色访问
        for (Permission permission : permissions) {
            String url = permission.getUrl();
            List<Role> roles=roleMapper.getRolesByPermssionId(permission.getId());
            for(Role role:roles){

                ConfigAttribute roleName = new SecurityConfig(role.getName());
                if(map.containsKey(url)){
                    map.get(url).add(roleName);
                }else{
                    List<ConfigAttribute> list =  new ArrayList<>();
                    list.add(roleName);
                    map.put(url,list);
                }
            }


        }
    }

}
