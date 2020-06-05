package com.dmatek.record.services.impl;

import com.dmatek.record.bean.Role;
import com.dmatek.record.bean.User;
import com.dmatek.record.mapper.RoleMapper;
import com.dmatek.record.mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 14:25
 * @Version 1.0
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final static Logger logger= LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("loadUserByUsername get UserDetails");
        User user=userMapper.loadUserByUsername(username);
        if(user!=null){
            List<Role> roles = roleMapper.getRolesByUserId(user.getId());
            user.setAuthorities(roles);
        }
        return user;
    }
}
