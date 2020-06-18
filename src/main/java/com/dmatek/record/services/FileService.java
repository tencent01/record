package com.dmatek.record.services;

import java.io.File;
import java.util.List;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/10 15:46
 * @Version 1.0
 */
public interface FileService {

    List<byte[]> readFile(String path);

    void deleteDir(File file);

    void createDir(String path);
}
