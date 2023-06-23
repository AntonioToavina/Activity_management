package com.example.serverapp.Controller;

import com.example.serverapp.Model.ViewModel.V_artistes;
import com.example.serverapp.Model.ViewModel.V_depensesdivers;
import com.example.serverapp.Model.ViewModel.V_element;
import com.example.serverapp.Model.ViewModel.V_lieu;
import com.example.serverapp.Repository.*;
import com.example.serverapp.Util.ResponseData;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping(value = "/datas")
public class Datas_Controller {

    Repo_Typeelements repo_typeelements;
    Repo_Typemateriels repo_typemateriels;
    Repo_Categorie_lieu repo_categorie_lieu;
    Repo_lieu repo_lieu;
    Repo_artiste repo_artiste;
    Repo_Elementbases repo_elementbases;
    Repo_Typedepense repo_typedepense;
    Repo_V_depensedivers repo_v_depensedivers;
    Repo_V_artistes repo_v_artistes;
    Repo_V_element repo_v_element;
    Repo_V_lieu repo_v_lieu;

    @GetMapping("/elementsbase")
    public ResponseEntity<Object> dataElementBase() {
        Object[] obj = new Object[2];
        obj[0] = repo_typeelements.findAll();
        obj[1] = repo_typemateriels.findAll();

        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @GetMapping("/lieu")
    public ResponseEntity<Object> datalieu() {
        return new ResponseEntity<>(new ResponseData(repo_categorie_lieu.findAll()), HttpStatus.OK);
    }

    @GetMapping("/devis")
    public ResponseEntity<Object> dataDevis() {
        Object[] obj = new Object[4];
        obj[0] = repo_lieu.findAll();
        obj[1] = repo_artiste.findAll();
        obj[2] = repo_elementbases.findAll();
        obj[3] = repo_typedepense.findAll();
        return new ResponseEntity<>(new ResponseData(obj), HttpStatus.OK);
    }

    @GetMapping("/devis/{id}/statistiques")
    public ResponseEntity<Object> getStatistiques(@PathVariable int id) {
        try {
            Object[] obj = new Object[4];
            Optional<V_artistes> optional = repo_v_artistes.findById(id);
            obj[0] = optional.orElse(null);

            Optional<V_element> optional2 = repo_v_element.findById(id);
            obj[1] = optional2.orElse(null);

            Optional<V_depensesdivers> optionalVDepensesdivers = repo_v_depensedivers.findById(id);
            obj[2] = optionalVDepensesdivers.orElse(null);

            Optional<V_lieu> optionalVLieu = repo_v_lieu.findById(id);
            obj[3] = optionalVLieu.orElse(null);

            return new ResponseEntity<>(new ResponseData(obj), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

}
