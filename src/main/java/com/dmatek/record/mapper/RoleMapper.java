package com.dmatek.record.mapper;

import com.dmatek.record.bean.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 14:26
 * @Version 1.0
 */
@Mapper
public interface RoleMapper {

    @Select("select id,name from role where id in (select role_id from user_role where user_id=#{user_id})")
    List<Role> getRolesByUserId(int user_id);

    @Select("select id,name from role where id in (select role_id from role_permssion where permission_id=#{permission_id})")
    List<Role> getRolesByPermssionId(long permission_id);
}
