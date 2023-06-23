package com.example.serverapp.Model.ViewModel;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "v_artistes")
@Data
public class V_artistes {
    @Id
    private Integer devis_id;

    private double total;
}
