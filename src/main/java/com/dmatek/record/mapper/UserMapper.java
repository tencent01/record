package com.dmatek.record.mapper;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 14:41
 * @Version 1.0
 */
@Mapper
public interface UserMapper {

    @Select("select id,name username from user")
    List<JSONObject> selectAllUser();


    @Select("select id id,name username,password from user where name=#{username} and password=#{password}")
    User selectUserByUsername(String username,String password);

    @Select("select id,name username,password from user where name=#{username}")
    User loadUserByUsername(String username);

    @Update("update user set password=#{password} where name=#{username}")
    boolean updateUserPassword(String username,String password);


    @Insert("insert into user (name,password) value (#{username},#{password})")
    @Options(useGeneratedKeys = true, keyProperty = "id",keyColumn="id")
    int addUser(User user);

    @Insert("insert into user_role (user_id,role_id) value (#{user_id},#{role_id})")
    int addUserRole (int user_id,int role_id);



}
