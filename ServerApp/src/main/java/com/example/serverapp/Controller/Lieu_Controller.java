package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.Lieu;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_lieu;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/lieu")
public class Lieu_Controller extends CrudController<Lieu, Repo_lieu, CrudService, Integer> {
    public Lieu_Controller(Repo_lieu repo, Repo_DB repo_db) {
        super(new Lieu(), repo, new CrudService(new PDF_Service()), repo_db);
    }
}
