package com.example.serverapp.Model.ViewModel;

import com.example.serverapp.Model.MainModel.*;
import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "devis")
@Data
public class V_devis {
    @Id
    @GeneratedValue
    private Integer id;

    private String libelle;

    private double duree;

    private Date datedevis;

    private double total;

    private LocalTime heure;

    private double recette;

    private double benefice;

    private double benefice_net;

    @OneToMany(mappedBy = "devis", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    @Column(nullable = true)
    List<DepenseArtistes> depenseArtistesList;

    @OneToMany(mappedBy = "devis", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    @Column(nullable = true)
    List<Depensedivers> depensediversList;

    @OneToMany(mappedBy = "devis", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    @Column(nullable = true)
    List<DepenseElements> depenseElementsList;

    @OneToMany(mappedBy = "devis", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    @Column(nullable = true)
    List<DepenseLieu> depenseLieuList;

    @OneToMany(mappedBy = "devis", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    @Column(nullable = true)
    List<PlaceVendus> placeVendus;
}
