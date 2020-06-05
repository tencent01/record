package com.dmatek.record.mapper;

import com.dmatek.record.bean.Permission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/5 14:51
 * @Version 1.0
 */
@Mapper
public interface PermissionMapper {

    @Select("select id,url,name,description,pid from permission")
    List<Permission> getPermissions();
}
