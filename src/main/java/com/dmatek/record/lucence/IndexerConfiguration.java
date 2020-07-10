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
    public IndexerConfiguration(){
//        String dir=getClass().getClassLoader().getResource("static/lucence").getFile();
//        String indexDir=dir.substring(1,dir.length()-1);
//        logger.info(indexDir);
    }

    @Bean
    public Indexer getIndexer(){

        String dir=this.getClass().getClassLoader().getResource("lucence").getFile();
        String indexDir=dir.substring(1,dir.length());
        return new Indexer("D:\\lucene");
    }



}
