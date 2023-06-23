package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "placevendus")
@Data
public class PlaceVendus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "devis_id", referencedColumnName = "id")
    private Devis devis;

    private Date datefin;

    private double vip_place;

    private double reserve_place;

    private double normal_place;
}
