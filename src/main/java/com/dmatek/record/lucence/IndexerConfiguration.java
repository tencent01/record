package com.dmatek.record.lucence;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/20 17:28
 * @Version 1.0
 */
@Configuration
public class IndexerConfiguration {


    private final static Logger logger= LoggerFactory.getLogger(IndexerConfiguration.class);


    @Bean
    public Indexer getIndexer(){
        return new Indexer("D:\\lucene");
    }



}
