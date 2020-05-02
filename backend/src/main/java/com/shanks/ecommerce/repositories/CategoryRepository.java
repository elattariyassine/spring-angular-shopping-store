package com.shanks.ecommerce.repositories;

import com.shanks.ecommerce.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

//@RepositoryRestResource(collectionResourceRel = "category", path = "category")
@CrossOrigin("http://localhost:4200")
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
