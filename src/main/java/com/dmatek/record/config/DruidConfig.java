package com.dmatek.record.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.StatViewServlet;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.HashMap;

/**
 * @Author: admin
 * @Description:
 * @Date: 2020/6/4 17:18
 * @Version 1.0
 */

//@Configuration
public class DruidConfig {

//    @Value("${spring.datasource.url}")
//    private String dbUrl;
//
//    @Value("${spring.datasource.username}")
//    private String username;
//
//    @Value("${spring.datasource.password}")
//    private String password;
//
//    @Value("${spring.datasource.driver-class-name}")
//    private String driverClassName;
//
//    @Value("${spring.datasource.initialSize}")
//    private int initialSize;
//
//    @Value("${spring.datasource.minIdle}")
//    private int minIdle;
//
//    @Value("${spring.datasource.maxActive}")
//    private int maxActive;
//
//    @Value("${spring.datasource.maxWait}")
//    private int maxWait;
//
//    @Value("${spring.datasource.timeBetweenEvictionRunsMillis}")
//    private int timeBetweenEvictionRunsMillis;
//
//    @Value("${spring.datasource.minEvictableIdleTimeMillis}")
//    private int minEvictableIdleTimeMillis;
//
//    @Value("${spring.datasource.maxEvictableIdleTimeMillis}")
//    private int maxEvictableIdleTimeMillis;
//
//    @Value("${spring.datasource.validationQuery}")
//    private String validationQuery;
//
//    @Value("${spring.datasource.testWhileIdle}")
//    private boolean testWhileIdle;
//
//    @Value("${spring.datasource.testOnBorrow}")
//    private boolean testOnBorrow;
//
//    @Value("${spring.datasource.testOnReturn}")
//    private boolean testOnReturn;
//
//    @Value("${spring.datasource.poolPreparedStatements}")
//    private boolean poolPreparedStatements;
//
//    @Value("${spring.datasource.maxPoolPreparedStatementPerConnectionSize}")
//    private int maxPoolPreparedStatementPerConnectionSize;
//
//    @Value("${spring.datasource.filters}")
//    private String filters;
//
//    @Value("{spring.datasource.connectionProperties}")
//    private String connectionProperties;

    /**
     * @Bean 声明，DataSource 对象为 Spring 容器所管理;
     * @Primary 表示这里定义的DataSource将覆盖其他来源的DataSource。
     * StatFilter，用于统计监控信息。StatFilter的别名是stat。
     * 统计SQL信息，合并统计。mergeStat是的MergeStatFilter缩写。
     *     通过 DataSource 的属性<property name="filters" value="mergeStat" /> 或者
     *                          connectProperties属性来打开mergeSql功能 <property name="connectionProperties" value="druid.stat.mergeSql=true" />
     * StatFilter属性slowSqlMillis用来配置SQL慢的标准
     * 解决 spring.datasource.filters=stat,wall,log4j 无法正常注册
     * @return
     */
//    @Bean
//    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
//        DruidDataSource datasource = new DruidDataSource();
//        datasource.setUrl(dbUrl);
//        datasource.setDriverClassName(driverClassName);
//        datasource.setUsername(username);
//        datasource.setPassword(password);
//
//        //configuration
//        datasource.setInitialSize(initialSize);
//        datasource.setMinIdle(minIdle);
//        datasource.setMaxActive(maxActive);
//        datasource.setMaxWait(maxWait);
//        datasource.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
//        datasource.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
//        datasource.setMinEvictableIdleTimeMillis(maxEvictableIdleTimeMillis);
//        datasource.setValidationQuery(validationQuery);
//        datasource.setTestWhileIdle(testWhileIdle);
//        datasource.setTestOnBorrow(testOnBorrow);
//        datasource.setTestOnReturn(testOnReturn);
//        datasource.setPoolPreparedStatements(poolPreparedStatements);
//        datasource.setMaxPoolPreparedStatementPerConnectionSize(maxPoolPreparedStatementPerConnectionSize);
//        try {
//            /**
//             * 设置StatFilter，用于统计监控信息。
//             * StatFilter的别名是stat
//             *
//             */
//            datasource.setFilters(filters);
//        } catch (SQLException e) {
//            System.err.println("druid configuration initialization filter: " + e);
//        }
//        datasource.setConnectionProperties(connectionProperties);

        return new DruidDataSource();
    }

}
