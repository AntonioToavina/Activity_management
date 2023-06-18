package com.example.serverapp.Model.MainModel;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "profils")
public class Profils {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pk_profils_seq_id")
    @SequenceGenerator(name = "pk_profils_seq_id", sequenceName = "profils_seq_id", allocationSize = 1)
    private Integer id;

    private String nom_profil;

}
