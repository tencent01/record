package com.dmatek.record.mapper;

import com.dmatek.record.bean.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 14:41
 * @Version 1.0
 */
@Mapper
public interface UserMapper {

    @Select("select id id,name username,password from user where name=#{username} and password=#{password}")
    User selectUserByUsername(String username,String password);

    @Select("select id,name username,password from user where name=#{username}")
    User loadUserByUsername(String username);

    @Update("update user set password=#{password} where name=#{username}")
    boolean updateUserPassword(String username,String password);


}
