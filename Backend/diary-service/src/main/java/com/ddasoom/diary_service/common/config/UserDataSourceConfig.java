package com.ddasoom.diary_service.common.config;

import java.util.HashMap;
import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "com.ddasoom.diary_service.diary.adapter.out.users"
        },
        entityManagerFactoryRef = "secondEntityManagerFactory",
        transactionManagerRef = "secondTransactionManager"
)
public class UserDataSourceConfig {

    //DataSource 정보를 불러온다
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.users")
    public DataSource secondDataSource() {
        return DataSourceBuilder.create().build();
    }

    //EntityManagerFactory 정의
    @Bean(name = "secondEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean deployPrimaryEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(secondDataSource());
        em.setPackagesToScan(
                "com.ddasoom.diary_service.diary.adapter.out.users"
        );

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        HashMap<String, Object> prop = new HashMap<>();
        prop.put("properties.hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        prop.put("hibernate.hbm2ddl.auto", "none");
        prop.put("hibernate.physical_naming_strategy",
                "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy");
        em.setJpaPropertyMap(prop);

        return em;
    }

    //TransactionManager 정의
    @Bean(name = "secondTransactionManager")
    public PlatformTransactionManager deployPrimaryTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(deployPrimaryEntityManager().getObject());
        return transactionManager;
    }
}

