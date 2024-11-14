package com.ddasoom.diary_service.common.config;

import java.util.HashMap;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(
        basePackages = {
                "com.ddasoom.diary_service.diary.adapter.out.daily",
                "com.ddasoom.diary_service.diary.adapter.out.panic",
                "com.ddasoom.diary_service.diary.adapter.out.training",
                "com.ddasoom.diary_service.diary.adapter.out.selfDiagnosis"
        },
        entityManagerFactoryRef = "primaryEntityManagerFactory",
        transactionManagerRef = "primaryTransactionManager"
)
public class DiaryDataSourceConfig {

    private static final String[] PACKAGES = {
            "com.ddasoom.diary_service.diary.adapter.out.daily",
            "com.ddasoom.diary_service.diary.adapter.out.panic",
            "com.ddasoom.diary_service.diary.adapter.out.training",
            "com.ddasoom.diary_service.diary.adapter.out.selfDiagnosis",
            "com.ddasoom.diary_service.diary.application.domain"
    };

    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String ddlAuto;

    //DataSource 정보를 불러온다
    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource.diary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    //EntityManagerFactory 정의
    @Bean(name = "primaryEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean localPrimaryEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(primaryDataSource());
        em.setPackagesToScan(PACKAGES);

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        HashMap<String, Object> prop = new HashMap<>();
        prop.put("properties.hibernate.dialect", "org.hibernate.dialect.H2Dialect");
        prop.put("hibernate.hbm2ddl.auto", ddlAuto);
        prop.put("hibernate.physical_naming_strategy",
                "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy");
        em.setJpaPropertyMap(prop);

        return em;
    }

    @Bean(name = "primaryEntityManagerFactory")
    @Primary
    @Profile("deploy")
    public LocalContainerEntityManagerFactoryBean deployPrimaryEntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(primaryDataSource());
        em.setPackagesToScan(PACKAGES);

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        HashMap<String, Object> prop = new HashMap<>();
        prop.put("properties.hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
        prop.put("hibernate.hbm2ddl.auto", ddlAuto);
        prop.put("hibernate.physical_naming_strategy",
                "org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy");
        em.setJpaPropertyMap(prop);

        return em;
    }

    //TransactionManager 정의
    @Bean(name = "primaryTransactionManager")
    @Primary
    public PlatformTransactionManager localTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(localPrimaryEntityManager().getObject());
        return transactionManager;
    }

    @Bean(name = "primaryTransactionManager")
    @Primary
    @Profile("deploy")
    public PlatformTransactionManager deployPrimaryTransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(deployPrimaryEntityManager().getObject());
        return transactionManager;
    }
}
