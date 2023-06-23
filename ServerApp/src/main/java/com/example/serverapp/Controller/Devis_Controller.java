package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.*;
import com.example.serverapp.Model.ViewModel.DevisSpectacle;
import com.example.serverapp.Model.ViewModel.V_devis;
import com.example.serverapp.Repository.*;
import com.example.serverapp.Service.MainService.Devis_Service;
import com.example.serverapp.Util.ResponseData;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/devis")

public class Devis_Controller extends CrudController<Devis, Repo_devis, CrudService, Integer> {
    Repo_DepenseLieu repo_depenseLieu;
    Repo_DepenseDivers repo_depenseDivers;
    Repo_DepenseElements repo_depenseElements;
    Repo_DepenseArtistes repo_depenseArtistes;
    Repo_V_devis repo_v_devis;

    Repo_taxe repo_taxe;

    Repo_placeVendus repo_placeVendus;

    public Devis_Controller(Repo_devis repo, CrudService service, Repo_DB repo_db, Repo_DepenseLieu repo_depenseLieu, Repo_DepenseDivers repo_depenseDivers, Repo_DepenseElements repo_depenseElements, Repo_DepenseArtistes repo_depenseArtistes, Repo_V_devis repo_v_devis, Repo_placeVendus repo_placeVendus, Repo_taxe repo_taxe) {
        super(new Devis(), repo, service, repo_db);
        this.repo_v_devis = repo_v_devis;
        this.repo_depenseArtistes = repo_depenseArtistes;
        this.repo_depenseLieu = repo_depenseLieu;
        this.repo_depenseDivers = repo_depenseDivers;
        this.repo_depenseElements = repo_depenseElements;
        this.repo_placeVendus = repo_placeVendus;
        this.repo_taxe = repo_taxe;
    }

    @PostMapping("/create")
    public ResponseEntity<Object> create(@RequestBody DevisSpectacle devis) {
        try {
            new Devis_Service().createDevis(devis, this.repo, repo_depenseArtistes, repo_depenseElements, repo_depenseDivers, repo_depenseLieu);
            return new ResponseEntity<>(new ResponseData("Devis pris en compte"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}/v_devis")
    public ResponseEntity<Object> getDetails(@PathVariable int id) {
        try {
            Optional<V_devis> optional = repo_v_devis.findById(id);
            V_devis v_devis = optional.orElse(null);
            return new ResponseEntity<>(new ResponseData(v_devis), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}/sync")
    public ResponseEntity<Object> syncDevis(@PathVariable int id) throws Exception {
        try {
            Devis_Service devis_service = new Devis_Service();

            Optional<V_devis> optional = repo_v_devis.findById(id);
            V_devis v_devis = optional.orElse(null);
            PlaceVendus placeVendus = v_devis.getPlaceVendus().get(0);
            DepenseLieu depenseLieu = v_devis.getDepenseLieuList().get(0);
            Taxe taxe = repo_taxe.findAll().get(0);


            Devis devis = new Devis(v_devis.getId(), v_devis.getLibelle(), v_devis.getDuree(), v_devis.getDatedevis(), v_devis.getTotal(), v_devis.getHeure(), v_devis.getRecette(), v_devis.getBenefice(), v_devis.getBenefice_net());
            DevisSpectacle devisSpectacle = new DevisSpectacle(devis, v_devis.getDepenseLieuList(), v_devis.getDepenseArtistesList(), v_devis.getDepenseElementsList(), v_devis.getDepensediversList());
            devis.setTotal(devis_service.getTotal(devisSpectacle));

            double beneficePlace = depenseLieu.getPrix_vip() * placeVendus.getVip_place() + depenseLieu.getPrix_reserve() * placeVendus.getReserve_place() + depenseLieu.getPrix_normal() * placeVendus.getNormal_place();
            devis.setRecette(beneficePlace);
            devis.setBenefice(devis.getRecette() - devis.getTotal());
            double benefice_net = devis.getRecette() - devis.getTotal();
            devis.setBenefice_net(benefice_net - ((benefice_net * taxe.getPourcentage())));

            this.repo.save(devis);

            return new ResponseEntity<>(new ResponseData("Ok"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<Object> generatePDF(@PathVariable int id) {
        try {
            InputStreamResource input = new Devis_Service().generatePDF(id, this.repo_v_devis);
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "inline;filename=FeteMusique.pdf");
            return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_PDF).body(input);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping("/{id}/beneficenet")
    public ResponseEntity<Object> setBeneficeNet(@PathVariable int id) {
        try {
            new Devis_Service().setBenefice_net(id, repo_v_devis, repo_placeVendus, repo_taxe, this.repo);
            return new ResponseEntity<>(new ResponseData("Ok"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

    @PostMapping("/{id}/bis")
    public ResponseEntity<Object> addBis(@RequestBody Devis devis, @PathVariable int id) {
        try {
            Optional<V_devis> optional = repo_v_devis.findById(id);
            V_devis v_devis = optional.orElse(null);

            Devis devisBis = new Devis(devis.getId(), v_devis.getLibelle() + " Bis", devis.getDuree(), devis.getDatedevis(), v_devis.getTotal(), v_devis.getHeure(), 0, v_devis.getBenefice(), 0);

            devisBis = this.repo.save(devisBis);

            //save depense artistes
            for (DepenseArtistes depenseArtistes : v_devis.getDepenseArtistesList()) {
                DepenseArtistes depenseArtistes1 = new DepenseArtistes(devisBis, depenseArtistes.getArtistes(), depenseArtistes.getDuree());
                repo_depenseArtistes.save(depenseArtistes1);
            }

            //save depense element
            for (DepenseElements depenseElements : v_devis.getDepenseElementsList()) {
                DepenseElements depenseElements1 = new DepenseElements(devisBis, depenseElements.getElementbases(), depenseElements.getDuree());
                repo_depenseElements.save(depenseElements1);
            }

            //save depense lieu
            for (DepenseLieu depenseLieu : v_devis.getDepenseLieuList()) {
                DepenseLieu depenseLieu1 = new DepenseLieu(devisBis, depenseLieu.getLieu(), depenseLieu.getMontant(), depenseLieu.getPrix_vip(), depenseLieu.getPrix_reserve(), depenseLieu.getPrix_normal());
                repo_depenseLieu.save(depenseLieu1);
            }

            //save autres depenses
            for (Depensedivers depensedivers : v_devis.getDepensediversList()) {
                Depensedivers depensedivers1 = new Depensedivers(devisBis, depensedivers.getTypeDepenses(), depensedivers.getMontant());
                repo_depenseDivers.save(depensedivers1);
            }

            return syncDevis(devisBis.getId());

        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseData(e.getMessage()), HttpStatus.OK);
        }
    }

}
