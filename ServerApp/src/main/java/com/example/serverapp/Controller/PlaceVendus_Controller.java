package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.PlaceVendus;
import com.example.serverapp.Model.ViewModel.V_devis;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_V_devis;
import com.example.serverapp.Repository.Repo_placeVendus;
import com.example.serverapp.Service.MainService.PlaceVendus_Service;
import com.example.serverapp.Util.ErrorResponse;
import com.example.serverapp.Util.ResponseData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/placesvendus")
public class PlaceVendus_Controller extends CrudController<PlaceVendus, Repo_placeVendus, CrudService, Integer> {
    Repo_V_devis repo_v_devis;

    public PlaceVendus_Controller(Repo_placeVendus repo, CrudService service, Repo_DB repo_db, Repo_V_devis repo_v_devis) {
        super(new PlaceVendus(), repo, service, repo_db);
        this.repo_v_devis = repo_v_devis;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> savePlaceVendus(@RequestBody PlaceVendus placeVendus) {
        try {
            Optional<V_devis> optional = repo_v_devis.findById(placeVendus.getDevis().getId());
            V_devis v_devis = optional.orElse(null);

            if (placeVendus.getVip_place() > v_devis.getDepenseLieuList().get(0).getLieu().getVip_place() || placeVendus.getVip_place() < 0)
                return new ResponseEntity<>(new ErrorResponse("Le nombre de place de vip ne peut pas etre superieur a sa capacite"), HttpStatus.OK);

            if (placeVendus.getReserve_place() > v_devis.getDepenseLieuList().get(0).getLieu().getReserve_place() || placeVendus.getReserve_place() < 0)
                return new ResponseEntity<>(new ErrorResponse("Le nombre de place reservé ne peut pas etre superieur a sa capacite"), HttpStatus.OK);

            if (placeVendus.getNormal_place() > v_devis.getDepenseLieuList().get(0).getLieu().getNormal_vip() || placeVendus.getNormal_place() < 0)
                return new ResponseEntity<>(new ErrorResponse("Le nombre de normal reservé ne peut pas etre superieur a sa capacite"), HttpStatus.OK);

            new PlaceVendus_Service().createPlaceVendus(this.repo, placeVendus);
            return new ResponseEntity<>(new ResponseData("Ok"), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }
}
