package com.example.serverapp.Model.MainModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "depenseelements")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepenseElements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "devis_id", referencedColumnName = "id")
    private Devis devis;

    @ManyToOne
    @JoinColumn(name = "elementbases_id", referencedColumnName = "id")
    private Elementbases elementbases;

    private double duree;

    public DepenseElements(Devis devis, Elementbases elementbases, double duree) {
        this.devis = devis;
        this.elementbases = elementbases;
        this.duree = duree;
    }
}
