package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "categorie_lieu")
@Data
public class Categorie_lieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String type;
}
