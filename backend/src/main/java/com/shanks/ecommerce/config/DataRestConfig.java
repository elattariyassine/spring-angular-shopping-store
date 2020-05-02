package com.shanks.ecommerce.config;

import com.shanks.ecommerce.entities.Category;
import com.shanks.ecommerce.entities.Product;
import org.hibernate.type.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
    private EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] unSupporteddActions = {HttpMethod.DELETE, HttpMethod.POST, HttpMethod.PUT};
        //disable http methods for product class (POST, PUT, DELETE)
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupporteddActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupporteddActions)));

        //disable http methods for category class (POST, PUT, DELETE)
        config.getExposureConfiguration()
                .forDomainType(Category.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unSupporteddActions)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unSupporteddActions)));
    }
}
