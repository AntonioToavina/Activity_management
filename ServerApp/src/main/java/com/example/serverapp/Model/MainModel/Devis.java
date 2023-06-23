package com.example.serverapp.Model.MainModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalTime;

@Entity
@Table(name = "devis")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Devis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String libelle;

    private double duree;

    private Date datedevis;

    private double total;

    private LocalTime heure;

    private double recette;

    private double benefice;

    private double benefice_net;
}
