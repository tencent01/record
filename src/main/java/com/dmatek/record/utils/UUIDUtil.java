package com.dmatek.record.utils;

import java.util.UUID;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/13 10:32
 * @Version 1.0
 */
public class UUIDUtil {
    public static void main(String[] args) {
        for(int i=0;i<10;i++){
            System.out.println(UUID.randomUUID().toString().replace("-",""));
        }
    }

}
