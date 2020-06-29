package com.dmatek.record.services;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 15:07
 * @Version 1.0
 */
public interface UserService {

    User selectUserByUsername(String username,String password);

    boolean updateUserPassword(String username,String password);

    List<JSONObject> selectAllUser();

}
