package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.Artistes;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_artiste;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/artistes")
public class Artiste_controller extends CrudController<Artistes, Repo_artiste, CrudService, Integer> {
    public Artiste_controller(Repo_artiste repo, Repo_DB repo_db) {
        super(new Artistes(), repo, new CrudService(new PDF_Service()), repo_db);
    }
}
