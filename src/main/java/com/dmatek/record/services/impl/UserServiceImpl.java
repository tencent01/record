package com.dmatek.record.services.impl;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.User;
import com.dmatek.record.mapper.UserMapper;
import com.dmatek.record.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 15:07
 * @Version 1.0
 */
@Service
public class UserServiceImpl implements UserService {

    private final static Logger logger= LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectUserByUsername(String username,String password) {
        logger.info("selectUserByUsername");
        return userMapper.selectUserByUsername(username,password);
    }

    @Override
    public boolean updateUserPassword(String username, String password) {
        logger.info("updateUserPassword");
        return userMapper.updateUserPassword(username,password);
    }

    @Override
    public List<JSONObject> selectAllUser() {
        return userMapper.selectAllUser();
    }

    @Override
    public boolean addUser(User user,int role) {
        int addUserResult=userMapper.addUser(user);
        int addRoleResult=userMapper.addUserRole(user.getId(),role);
        System.out.println(addUserResult);
        System.out.println(addRoleResult);
        if(addRoleResult==1){
            return true;
        }
        return false;
    }
}
