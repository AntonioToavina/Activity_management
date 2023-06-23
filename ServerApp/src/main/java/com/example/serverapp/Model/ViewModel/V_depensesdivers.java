package com.example.serverapp.Model.ViewModel;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "v_depensesdivers")
@Data
public class V_depensesdivers {
    @Id
    private Integer devis_id;

    private double total;
}
