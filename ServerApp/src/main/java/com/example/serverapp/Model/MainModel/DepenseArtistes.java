package com.example.serverapp.Model.MainModel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "depenseartistes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepenseArtistes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "devis_id", referencedColumnName = "id")
    Devis devis;

    @ManyToOne
    @JoinColumn(name = "artistes_id", referencedColumnName = "id")
    Artistes artistes;

    double duree;

    public DepenseArtistes(Devis devis, Artistes artistes, double duree) {
        this.devis = devis;
        this.artistes = artistes;
        this.duree = duree;
    }
}
