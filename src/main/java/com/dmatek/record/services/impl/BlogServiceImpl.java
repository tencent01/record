package com.dmatek.record.services.impl;

import com.dmatek.record.bean.BlogNode;
import com.dmatek.record.component.FileComponent;
import com.dmatek.record.services.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/11 16:44
 * @Version 1.0
 */
@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private FileComponent fileComponent;

    @Override
    public List<BlogNode> allFile() {
        return fileComponent.fileToBlogNodeList();
    }
}
