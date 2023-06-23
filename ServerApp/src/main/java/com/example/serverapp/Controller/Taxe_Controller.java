package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.Taxe;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_taxe;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/taxes")
public class Taxe_Controller extends CrudController<Taxe, Repo_taxe, CrudService, Integer> {
    public Taxe_Controller(Repo_taxe repo, CrudService service, Repo_DB repo_db) {
        super(new Taxe(), repo, service, repo_db);
    }
}
