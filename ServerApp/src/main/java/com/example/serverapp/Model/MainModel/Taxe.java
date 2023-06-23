package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "taxe")
@Data
public class Taxe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private double pourcentage;
}
