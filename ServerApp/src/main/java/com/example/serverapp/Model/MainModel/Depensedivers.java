package com.example.serverapp.Model.MainModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "diversdepensedevis")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Depensedivers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "devis_id", referencedColumnName = "id")
    Devis devis;

    @ManyToOne
    @JoinColumn(name = "typedepenses_id", referencedColumnName = "id")
    TypeDepenses typeDepenses;

    double montant;

    public Depensedivers(Devis devis, TypeDepenses typeDepenses, double montant) {
        this.devis = devis;
        this.typeDepenses = typeDepenses;
        this.montant = montant;
    }
}
