package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "elementbases")
@Data
public class Elementbases {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;

    @ManyToOne
    @JoinColumn(name = "typeelement_id", referencedColumnName = "id")
    private Typeelements typeelements;

    @ManyToOne
    @JoinColumn(name = "typemateriels_id", referencedColumnName = "id")
    private Typemateriels typemateriels;

    private double tarif;
    
}
