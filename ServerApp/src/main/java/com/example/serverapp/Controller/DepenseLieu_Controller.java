package com.example.serverapp.Controller;

import com.example.serverapp.Generalization.Main.CrudController;
import com.example.serverapp.Generalization.Main.CrudService;
import com.example.serverapp.Model.MainModel.DepenseLieu;
import com.example.serverapp.Repository.Repo_DB;
import com.example.serverapp.Repository.Repo_DepenseLieu;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/depensesplaces")
public class DepenseLieu_Controller extends CrudController<DepenseLieu, Repo_DepenseLieu, CrudService, Integer> {
    public DepenseLieu_Controller(Repo_DepenseLieu repo, CrudService service, Repo_DB repo_db) {
        super(new DepenseLieu(), repo, service, repo_db);
    }
}
