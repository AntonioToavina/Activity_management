package com.example.serverapp.Model.ViewModel;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "v_element")
@Data
public class V_element {
    @Id
    private Integer devis_id;

    private double total;
}
