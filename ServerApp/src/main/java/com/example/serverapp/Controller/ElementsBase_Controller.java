package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Generalization.Service.PDF_Service;
import com.example.serverapp.Model.MainModel.Elementbases;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_Elementbases;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/elementbases")
public class ElementsBase_Controller extends CrudController<Elementbases, Repo_Elementbases, CrudService, Integer> {
    public ElementsBase_Controller(Repo_Elementbases repo, Repo_DB repo_db) {
        super(new Elementbases(), repo, new CrudService(new PDF_Service()), repo_db);
    }

}
