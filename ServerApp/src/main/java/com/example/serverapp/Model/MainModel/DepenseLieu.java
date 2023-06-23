package com.example.serverapp.Model.MainModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "depenselieu")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepenseLieu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "devis_id", referencedColumnName = "id")
    Devis devis;

    @ManyToOne
    @JoinColumn(name = "lieu_id", referencedColumnName = "id")
    private Lieu lieu;

    private double montant;

    private double prix_vip;

    private double prix_reserve;

    private double prix_normal;

    public DepenseLieu(Devis devis, Lieu lieu, double montant, double prix_vip, double prix_reserve, double prix_normal) {
        this.devis = devis;
        this.lieu = lieu;
        this.montant = montant;
        this.prix_vip = prix_vip;
        this.prix_reserve = prix_reserve;
        this.prix_normal = prix_normal;
    }
}
