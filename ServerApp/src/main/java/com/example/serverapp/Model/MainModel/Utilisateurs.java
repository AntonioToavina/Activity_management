package com.example.serverapp.Model.MainModel;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "utilisateurs")
@Getter
@Setter
public class Utilisateurs {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pk_utilisateurs_seq_id")
    @SequenceGenerator(name = "pk_utilisateurs_seq_id", sequenceName = "utilisateurs_seq_id", allocationSize = 1)
    private Integer id;

    private String nom;

    private String prenom;

    private String email;

    private String mdp;

    @OneToOne
    @JoinColumn(name = "profil_id", referencedColumnName = "id")
    private Profils profil;
}
