package com.example.serverapp.Model.MainModel;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "typeelements")
@Data
public class Typeelements {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String element;

    private int frequence;
}
