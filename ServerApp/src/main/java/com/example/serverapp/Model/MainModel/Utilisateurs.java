package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "utilisateurs")
@Data
public class Utilisateurs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String nom;

    private String prenom;

    private String email;

    private String mdp;

    @OneToOne
    @JoinColumn(name = "profil_id", referencedColumnName = "id")
    private Profils profil;
}
