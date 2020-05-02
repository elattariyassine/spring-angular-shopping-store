package com.shanks.ecommerce.entities;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private Set<Product> products;
}
