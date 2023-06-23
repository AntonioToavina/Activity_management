package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.Utilisateurs;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_Utilisateur;
import com.example.serverapp.Service.MainService.Utilisateur_Service;
import com.example.serverapp.Util.ErrorResponse;
import com.example.serverapp.Util.ResponseData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/utilisateurs")
public class Utilisateur_Controller extends CrudController<Utilisateurs, Repo_Utilisateur, Utilisateur_Service, Integer> {
    public Utilisateur_Controller(Repo_Utilisateur repoUtilisateur, Repo_DB repo_db) {
        super(new Utilisateurs(), repoUtilisateur, new Utilisateur_Service(new PDF_Service()), repo_db);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Utilisateurs user) {
        try {
            user = this.service.login(this.repo_db, user);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseData(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new ErrorResponse(e.getMessage()));
        }
    }

    public ResponseEntity<Object> search(@RequestBody Utilisateurs objBody, int page) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseData(this.service.search(objBody, this.repo_db, page, "V_utilisateurs")));
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseData(e.getMessage()));
        }
    }

    @PostMapping("/finds")
    public Object find(@RequestBody Utilisateurs utilisateurs) throws Exception {
        return this.repo_db.find(utilisateurs, -2);
    }
}
