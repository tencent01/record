package com.dmatek.record.services.impl;

import com.dmatek.record.bean.User;
import com.dmatek.record.mapper.UserMapper;
import com.dmatek.record.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
