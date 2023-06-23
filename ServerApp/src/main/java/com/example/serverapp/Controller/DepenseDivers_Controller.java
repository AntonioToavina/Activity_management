package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.Depensedivers;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_DepenseDivers;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/diversdepenses")
public class DepenseDivers_Controller extends CrudController<Depensedivers, Repo_DepenseDivers, CrudService, Integer> {
    public DepenseDivers_Controller(Repo_DepenseDivers repo, CrudService service, Repo_DB repo_db) {
        super(new Depensedivers(), repo, service, repo_db);
    }
}
