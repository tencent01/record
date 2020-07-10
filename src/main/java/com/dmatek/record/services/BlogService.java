package com.dmatek.record.services;

import com.alibaba.fastjson.JSONObject;
import com.dmatek.record.bean.BlogNode;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/11 16:46
 * @Version 1.0
 */
public interface BlogService {

    List<BlogNode> allFile();
    List<String> addSolve(JSONObject solve);
}
