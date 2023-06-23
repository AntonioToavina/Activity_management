package com.example.serverapp.Model.ViewModel;

import com.example.serverapp.Model.MainModel.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DevisSpectacle {
    Devis devis;

    List<DepenseLieu> depenseLieus;

    List<DepenseArtistes> artistes;

    List<DepenseElements> depenseElements;

    List<Depensedivers> depensedivers;

}
